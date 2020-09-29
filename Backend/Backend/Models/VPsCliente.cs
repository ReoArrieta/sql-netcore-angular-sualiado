using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class VPsCliente
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Cedula { get; set; }
        public string Correo { get; set; }
        public string Usuario { get; set; }
        public string Telefono { get; set; }
        public int TipoRol { get; set; }
    }
}
