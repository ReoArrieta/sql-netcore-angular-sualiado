using System;
using System.Linq;
using Backend.Models;
using Backend.Models.Request;
using Backend.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LostController : ControllerBase
    {
        //Métodos para Leer y Crear los datos de las tablas Perdida y DetallePerdida
        [HttpGet]
        public IActionResult Get()
        {
            Response response = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.VPrMostrar.OrderByDescending(p => p.Id).ToList();
                    response.Exito = 1;
                    response.Message = "¡Conexión Exitosa a DataBase!";
                    response.Data = lst;
                }
            }
            catch (Exception e)
            {
                response.Message = e.Message;
            }
            return Ok(response);
        }
        [HttpGet("detail/{Id}")]
        public IActionResult GetDetail(int Id)
        {
            Response response = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.VDpMostrar.Where(dp => dp.IdPerdida == Id).ToList();
                    response.Exito = 1;
                    response.Message = "¡Conexión Exitosa a DataBase!";
                    response.Data = lst;
                }
            }
            catch (Exception e)
            {
                response.Message = e.Message;
            }
            return Ok(response);
        }
        [HttpPost]
        public IActionResult Post(LostRequest model)
        {
            Response response = new Response();

            using (JobsPhonesCTX db = new JobsPhonesCTX())
            {
                using (var dbContextTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        Perdida perdida = new Perdida();
                        perdida.IdUsuarioAdmin = model.IdUsuarioAdmin;
                        perdida.FechaPerdida = DateTime.Now;

                        perdida.IdEstadoPerdida = 1;
                        db.Perdida.Add(perdida);
                        db.SaveChanges();

                        foreach (var detalle in model.Detalles)
                        {
                                DetallePerdida dp = new DetallePerdida();
                                dp.IdPerdida = perdida.Id;
                                dp.IdProductoPerdida = detalle.IdProductoPerdida;
                                dp.CostoProducto = detalle.CostoProducto;
                                dp.CantidadPerdida = detalle.CantidadPerdida;
                                dp.DescripcionPerdida = detalle.DescripcionPerdida;
                                db.DetallePerdida.Add(dp);

                                var pd = db.Producto.Find(dp.IdProductoPerdida);
                                pd.ExistenciaProducto -= dp.CantidadPerdida;

                                if (pd.ExistenciaProducto == 0) pd.IdEstadoProducto = 2;
                        }
                        db.SaveChanges();
                        dbContextTransaction.Commit();
                        response.Exito = 1;
                    }
                    catch (Exception e)
                    {
                        response.Message = e.Message;
                    }
                }
            }
            return Ok(response);
        }
    }
}