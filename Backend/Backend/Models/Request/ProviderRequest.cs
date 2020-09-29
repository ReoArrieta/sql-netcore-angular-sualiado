using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Request
{
    public class ProviderRequest
    {
        public int Id { get; set; }
        public string NombreProveedor { get; set; }
        public string NitProveedor { get; set; }
        public string DireccionProveedor { get; set; }
        public string TelefonoProveedor { get; set; }
        public string UrlProveedor { get; set; }
    }
}
