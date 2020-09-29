using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class VVtMostrar
    {
        public int Id { get; set; }
        public int IdUsuarioAdmin { get; set; }
        public string Admin { get; set; }
        public int IdUsuarioCliente { get; set; }
        public string Cliente { get; set; }
        public DateTime FechaVenta { get; set; }
        public int? Total { get; set; }
    }
}
