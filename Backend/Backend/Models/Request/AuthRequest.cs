using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Request
{
    public class AuthRequest
    {
        public string Correo { get; set; }
        public string Contrasena { get; set; }
    }
}
