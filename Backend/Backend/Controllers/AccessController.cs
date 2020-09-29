using Backend.Models;
using Backend.Models.Request;
using Backend.Models.Response;
using Backend.Services;
using Backend.Tools;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Net;
using System.Net.Mail;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessController : ControllerBase
    {

        private IUserService _userService;
        public AccessController(IUserService userService) => _userService = userService;

        [HttpPost("login")]
        public IActionResult Login(AuthRequest model)
        {
            Response response = new Response();
            var userresponse = _userService.Auth(model);
            if (userresponse != null)
            {
                response.Exito = 1;
                response.Data = userresponse;
            }
            return Ok(response);
        }
        [HttpPost("signup")]
        public IActionResult Signup(PersonRequest model)
        {
            Response response = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    string password = Encrypt.GetSHA256(model.Contrasena);
                    Persona persona = new Persona();
                    persona.Nombre = model.Nombre.Trim();
                    persona.Apellido = model.Apellido.Trim();
                    persona.Cedula = model.Cedula;
                    persona.FechaNacimiento = model.FechaNacimiento;
                    persona.Usuario = model.Usuario;
                    persona.Correo = model.Correo.Trim();
                    persona.Contrasena = password;
                    persona.Telefono = model.Telefono;
                    persona.TipoRol = 2;
                    persona.IdEstado = 1;
                    db.Persona.Add(persona);
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
        [HttpGet("cedula/{cedula}")]
        public IActionResult GetCedula(string cedula)
        {
            Response response = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.Persona.Where(p => p.Cedula == cedula.Trim()).FirstOrDefault();
                    if (lst != null) response.Exito = 1;
                }
            }
            catch (Exception e)
            {
                response.Message = e.Message;
            }
            return Ok(response);
        }
        [HttpGet("mail/{correo}")]
        public IActionResult GetMail(string correo)
        {
            Response response = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.Persona.Where(p => p.Correo == correo.Trim()).FirstOrDefault();
                    if (lst != null) response.Exito = 1;
                }
            }
            catch (Exception e)
            {
                response.Message = e.Message;
            }
            return Ok(response);
        }
        [HttpGet("user/{usuario}")]
        public IActionResult GetUser(string usuario)
        {
            Response response = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.Persona.Where(p => p.Usuario == usuario.Trim()).FirstOrDefault();
                    if (lst != null) response.Exito = 1;
                }
            }
            catch (Exception e)
            {
                response.Message = e.Message;
            }
            return Ok(response);
        }
        [HttpGet("phone/{telefono}")]
        public IActionResult GetPhone(string telefono)
        {
            Response response = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.Persona.Where(p => p.Telefono == telefono.Trim()).FirstOrDefault();
                    if (lst != null) response.Exito = 1;
                }
            }
            catch (Exception e)
            {
                response.Message = e.Message;
            }
            return Ok(response);
        }
        [HttpGet("token/{token}")]
        public IActionResult GetToken(string token)
        {
            Response response = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.Persona.Where(p => p.Token == token.Trim()).FirstOrDefault();
                    if (lst == null) response.Exito = 1;
                }
            }
            catch (Exception e)
            {
                response.Message = e.Message;
            }
            return Ok(response);
        }
        [HttpPost("forgot")]
        public IActionResult ForgotPassword(ForgotRequest model)
        {
            Response response = new Response();

            string token = Encrypt.GetSHA256(Guid.NewGuid().ToString());

            using (JobsPhonesCTX db = new JobsPhonesCTX())
            {
                var persona = db.Persona.Where(p => p.Correo == model.Correo.Trim()).FirstOrDefault();
                if (persona != null)
                {
                    persona.Token = token;
                    db.Entry(persona).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();

                    //enviar mail
                    SendEmail(persona.Correo, token);
                    response.Exito = 1;
                }
            }
            return Ok(response);
        }
        [HttpPut("reset")]
        public IActionResult ResetPassword(ResetRequest model)
        {
            Response response = new Response();

            using (JobsPhonesCTX db = new JobsPhonesCTX())
            {
                var persona = db.Persona.Where(p => p.Token == model.Token.Trim()).FirstOrDefault();
                if (persona != null)
                {
                    string contrasena = Encrypt.GetSHA256(model.Contrasena);
                    persona.Contrasena = contrasena;
                    persona.Token = null;
                    db.Entry(persona).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();

                    response.Exito = 1;
                }
            }
            return Ok(response);
        }
        #region Tools
        public void SendEmail(string correo, string token)
        {
            string correoOrigen = "jobsphones@gmail.com";
            string contraseña = "1005650122";
            string url = "http://localhost:4200/recuperar/" + token;
            MailMessage Mail = new MailMessage();
            Mail.From = new MailAddress("jobsphones@gmail.com");
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
    }
}