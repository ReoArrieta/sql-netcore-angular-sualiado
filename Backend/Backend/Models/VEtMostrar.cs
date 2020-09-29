using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class VEtMostrar
    {
        public int Id { get; set; }
        public int IdUsuarioAdmin { get; set; }
        public string Admin { get; set; }
        public int IdProveedorEntrada { get; set; }
        public string NombreProveedor { get; set; }
        public DateTime FechaEntrada { get; set; }
        public int? Total { get; set; }
    }
}
