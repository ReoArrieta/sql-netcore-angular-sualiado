using Backend.Models;
using Backend.Models.Request;
using Backend.Models.Response;
using Backend.Tools;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PersonController : ControllerBase
    {
        //Métodos para Leer,Crear,Editar,Eliminar los datos de la vista V_Us_Cliente
        [HttpGet]
        public IActionResult Get()
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.VPsAdmin.ToList();
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
        [HttpGet("find/{jwt}")]
        public IActionResult GetAdmin(string jwt)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    string EncriptJWT = Encrypt.GetSHA256(jwt);
                    var lst = db.VPsAdmin.Where(p => p.Jwt == EncriptJWT).ToList();
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
        [HttpGet("client")]
        public IActionResult GetClient()
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.VPsCliente.OrderByDescending(c => c.Id).ToList();
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
        [HttpPost]
        public IActionResult Add(PersonRequest model)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    string password = Encrypt.GetSHA256(model.Contrasena);
                    Persona persona = new Persona();
                    persona.Nombre = model.Nombre;
                    persona.Apellido = model.Apellido;
                    persona.Cedula = model.Cedula;
                    persona.FechaNacimiento = model.FechaNacimiento;
                    persona.Usuario = model.Usuario;
                    persona.Correo = model.Correo;
                    persona.Contrasena = password;
                    persona.Telefono = model.Telefono;
                    persona.TipoRol = 1;
                    persona.IdEstado = 2;
                    db.Persona.Add(persona);
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
        #region Tools
        public void sendEmail(string correo, string token)
        {
            string correoOrigen = "reoelproandroid@gmail.com";
            string contraseña = "1005650122";
            string url = "https://localhost:4200/restablecer/" + token;
            MailMessage Mail = new MailMessage();
            Mail.From = new MailAddress("reoelproandroid@gmail.com");
            Mail.To.Add(correo);
            Mail.Subject = ("Recuperar Contraseña");
            Mail.Body = "<p>Hola! Buen dia, Usted solicito recuperar su contraseña<p><br>" +
                "<a href='" + url + "'>Click para recuperar</a>";
            Mail.Priority = MailPriority.Normal;
            Mail.IsBodyHtml = true;
            SmtpClient ServidorCorreo = new SmtpClient();
            ServidorCorreo.Credentials = new NetworkCredential(correoOrigen, contraseña);
            ServidorCorreo.Host = "smtp.gmail.com";
            ServidorCorreo.Port = 587;
            ServidorCorreo.EnableSsl = true;
            try
            {
                ServidorCorreo.Send(Mail);
            }
            catch (Exception e)
            {
                Console.Write(e);
            }
            Mail.Dispose();
        }
        #endregion
        #region Basura
        /*[HttpPut]
        public IActionResult Edit(PersonRequest model)
        {
            Response response = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    Persona persona = db.Persona.Find(model.Id);
                    persona.Nombre = model.Nombre;
                    persona.Apellido = model.Apellido;
                    persona.Cedula = model.Cedula;
                    persona.FechaNacimiento = model.FechaNacimiento;
                    persona.Correo = model.Correo;
                    persona.Usuario = model.Usuario;
                    //persona.Contrasena = model.Contrasena;
                    persona.Telefono = model.Telefono;
                    persona.TipoRol = 2;
                    db.Entry(persona).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();
                    response.Exito = 1;
                }
            }
            catch (Exception e)
            {
                response.Message = e.Message;
            }
            return Ok(response);
        }
        [HttpDelete("{Id}")]
        public IActionResult Delete(int Id)
        {
            Response response = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    Persona persona = db.Persona.Find(Id);
                    db.Remove(persona);
                    db.SaveChanges();
                    response.Exito = 1;
                }
            }
            catch (Exception e)
            {
                response.Message = e.Message;
            }
            return Ok(response);
        }*/
        #endregion
    }
}