using Backend.Models;
using Backend.Models.Common;
using Backend.Models.Request;
using Backend.Models.Response;
using Backend.Tools;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        public UserService(IOptions<AppSettings> appSettings) => _appSettings = appSettings.Value;
        public UserResponse Auth(AuthRequest model)
        {
            Response response = new Response();
            UserResponse userresponse = new UserResponse();
            try
            {
                using (var db = new JobsPhonesCTX())
                {
                    string password = Encrypt.GetSHA256(model.Contrasena);
                    var persona = db.Persona.Where(d => d.Correo == model.Correo && d.Contrasena == password).FirstOrDefault();
                    if (persona == null) return null;
                    userresponse.Usuario = persona.Usuario;
                    userresponse.Token = GetToken(persona);
                    if (persona != null)
                    {
                        persona.Jwt = Encrypt.GetSHA256(userresponse.Token);
                        db.Entry(persona).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                        db.SaveChanges();

                        response.Exito = 1;
                    }
                }
            }
            catch(Exception e)
            {
                response.Message = e.Message;
            }
            return userresponse;
        }
        private string GetToken(Persona persona)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var llave = Encoding.ASCII.GetBytes(_appSettings.Secreto);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, persona.Id.ToString()),
                        new Claim(ClaimTypes.NameIdentifier, persona.Cedula),
                        new Claim(ClaimTypes.NameIdentifier, persona.Correo),
                        new Claim(ClaimTypes.NameIdentifier, persona.Telefono),
                        new Claim(ClaimTypes.NameIdentifier, persona.Usuario)
                    }
                    ),
                Expires = DateTime.UtcNow.AddDays(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(llave), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}