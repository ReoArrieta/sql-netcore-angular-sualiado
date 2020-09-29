using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class VDeMostrar
    {
        public int Id { get; set; }
        public int IdEntrada { get; set; }
        public int IdProductoEntrada { get; set; }
        public string NombreProducto { get; set; }
        public int CostoProducto { get; set; }
        public int CantidadEntrada { get; set; }
        public int? TotalEntrada { get; set; }
    }
}
