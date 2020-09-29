using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Request
{
    public class ResetRequest
    {
        public string Token { get; set; }
        public string Contrasena { get; set; }
    }
}
