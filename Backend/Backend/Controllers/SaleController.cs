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
    public class SaleController : ControllerBase
    {
        //Métodos para Leer y Crear los datos de la tablas Venta y DetalleVenta
        #region Venta
        [HttpGet]
        public IActionResult Get()
        {
            Response response = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.VVtMostrar.OrderByDescending(v => v.Id).ToList();
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
        public IActionResult GetDetail(int id)
        {
            Response response = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.VDvMostrar.Where(dv => dv.IdVenta == id).ToList();
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
        public IActionResult Post(SaleRequest model)
        {
            Response response = new Response();

            using (JobsPhonesCTX db = new JobsPhonesCTX())
            {
                using (var dbContextTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        Venta venta = new Venta();
                        venta.IdUsuarioAdmin = model.IdUsuarioAdmin;
                        venta.IdUsuarioCliente = model.IdUsuarioCliente;
                        venta.FechaVenta = DateTime.Now;
                        venta.IdEstadoVenta = 1;
                        db.Venta.Add(venta);
                        db.SaveChanges();

                        foreach (var detalle in model.Detalles)
                        {

                            DetalleVenta dv = new DetalleVenta();
                            dv.IdVenta = venta.Id;
                            dv.IdProductoVenta = detalle.IdProductoVenta;
                            dv.CantidadVenta = detalle.CantidadVenta;
                            dv.PrecioProducto = detalle.PrecioProducto;
                            dv.DescuentoVenta = detalle.DescuentoVenta;
                            db.DetalleVenta.Add(dv);

                            var pd = db.Producto.Find(dv.IdProductoVenta);
                            pd.ExistenciaProducto -= dv.CantidadVenta;

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
        #endregion
    }
}