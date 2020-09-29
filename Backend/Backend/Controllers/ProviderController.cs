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
    public class ProviderController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.Proveedor.Where(p => p.IdEstadoProveedor != 3).OrderBy(p => p.NombreProveedor).ToList();
                    res.Exito = 1;
                    res.Data = lst;
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpGet("name/{nombreProveedor}")]
        public IActionResult GetName(string nombreProveedor)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.Proveedor.Where(p => p.NombreProveedor == nombreProveedor.Trim()).ToList();
                    if (lst.Count > 0)
                    {
                        res.Exito = 1;
                        res.Data = lst;
                    }
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpGet("nit/{nit}")]
        public IActionResult GetNit(string nit)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.Proveedor.Where(p => p.NitProveedor == nit.Trim()).ToList();
                    if (lst.Count > 0)
                    {
                        res.Exito = 1;
                        res.Data = lst;
                    }
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpGet("phone/{phone}")]
        public IActionResult GetPhone(string phone)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.Proveedor.Where(p => p.TelefonoProveedor == phone.Trim()).ToList();
                    if (lst.Count > 0)
                    {
                        res.Exito = 1;
                        res.Data = lst;
                    }
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpGet("url/{url}")]
        public IActionResult GetUrl(string url)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.Proveedor.Where(p => p.UrlProveedor == url.Trim()).ToList();
                    if (lst.Count > 0)
                    {
                        res.Exito = 1;
                        res.Data = lst;
                    }
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpPost]
        public IActionResult Add(ProviderRequest model)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var valNombre = db.Proveedor.Where(p => p.NombreProveedor == model.NombreProveedor.Trim()).FirstOrDefault();
                    if (valNombre == null)
                    {
                        Proveedor proveedor = new Proveedor();
                        proveedor.NombreProveedor = model.NombreProveedor;
                        proveedor.NitProveedor = model.NitProveedor;
                        proveedor.DireccionProveedor = model.DireccionProveedor;
                        proveedor.TelefonoProveedor = model.TelefonoProveedor;
                        proveedor.UrlProveedor = model.UrlProveedor;
                        proveedor.IdEstadoProveedor = 1;
                        db.Proveedor.Add(proveedor);
                        db.SaveChanges();

                        res.Exito = 1;
                    }
                    else if (valNombre.IdEstadoProveedor == 3)
                    {
                        Proveedor proveedor = db.Proveedor.Find(valNombre.Id);
                        proveedor.NitProveedor = model.NitProveedor;
                        proveedor.DireccionProveedor = model.DireccionProveedor;
                        proveedor.TelefonoProveedor = model.TelefonoProveedor;
                        proveedor.UrlProveedor = model.UrlProveedor;
                        proveedor.IdEstadoProveedor = 1;
                        db.Entry(proveedor).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                        db.SaveChanges();

                        res.Exito = 1;
                    }
                    else
                        res.Message = "Proveedor existente";
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpPut]
        public IActionResult Edit(ProviderRequest model)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    Proveedor proveedor = db.Proveedor.Find(model.Id);
                    proveedor.NombreProveedor = model.NombreProveedor;
                    proveedor.NitProveedor = model.NitProveedor;
                    proveedor.DireccionProveedor = model.DireccionProveedor;
                    proveedor.TelefonoProveedor = model.TelefonoProveedor;
                    proveedor.UrlProveedor = model.UrlProveedor;
                    db.Entry(proveedor).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();

                    res.Exito = 1;
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpDelete("{Id}")]
        public IActionResult Delete(int Id)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    Proveedor proveedor = db.Proveedor.Find(Id);
                    proveedor.IdEstadoProveedor = 3;
                    db.Entry(proveedor).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();

                    res.Exito = 1;
                    res.Message = "¡Se elimino correctamente los datos";
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpDelete("return/{Id}")]
        public IActionResult ReturnDelete(int Id)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    Proveedor proveedor = db.Proveedor.Find(Id);
                    proveedor.IdEstadoProveedor = 1;
                    db.Entry(proveedor).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();

                    res.Exito = 1;
                    res.Message = "¡Se deshizo correctamente la acción";
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
    }
}