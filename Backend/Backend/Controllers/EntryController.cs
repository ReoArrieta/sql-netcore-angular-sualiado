using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Models.Request;
using Backend.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EntryController : ControllerBase
    {
        //Métodos para Leer y Crear los datos de las tablas Entrada y DetalleEntrada
        [HttpGet]
        public IActionResult Get()
        {
            Response response = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.VEtMostrar.OrderByDescending(e => e.Id).ToList();
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
        public IActionResult GetDatail(int Id)
        {
            Response response = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.VDeMostrar.Where(de => de.IdEntrada == Id).ToList();
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
        public IActionResult Post(EntryRequest model)
        {
            Response response = new Response();

            using (JobsPhonesCTX db = new JobsPhonesCTX())
            {
                using (var dbContextTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        Entrada entrada = new Entrada();
                        entrada.IdUsuarioAdmin = model.IdUsuarioAdmin;
                        entrada.IdProveedorEntrada = model.IdProveedorEntrada;
                        entrada.FechaEntrada = DateTime.Now;
                        entrada.IdEstadoEntrada = 1;
                        db.Entrada.Add(entrada);
                        db.SaveChanges();

                        foreach (var detalle in model.Detalles)
                        {
                            DetalleEntrada de = new DetalleEntrada();
                            de.IdEntrada = entrada.Id;
                            de.IdProductoEntrada = detalle.IdProductoEntrada;
                            de.CostoProducto = detalle.CostoProducto;
                            de.CantidadEntrada = detalle.CantidadEntrada;
                            db.DetalleEntrada.Add(de);

                            var pd = db.Producto.Find(de.IdProductoEntrada);
                            pd.ExistenciaProducto += de.CantidadEntrada;
                            if (pd.IdEstadoProducto != 1) pd.IdEstadoProducto = 1;

                        }
                        db.SaveChanges();
                        dbContextTransaction.Commit();
                        response.Exito = 1;
                        response.Message = "¡Se guardo correctamente los datos!";
                    }
                    catch (Exception e)
                    {
                        dbContextTransaction.Rollback();
                        response.Message = e.Message;
                    }
                }
            }
            return Ok(response);
        }
    }
}