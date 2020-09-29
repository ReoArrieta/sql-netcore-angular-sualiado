using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class VDpMostrar
    {
        public int Id { get; set; }
        public int IdPerdida { get; set; }
        public int IdProductoPerdida { get; set; }
        public string NombreProducto { get; set; }
        public int CostoProducto { get; set; }
        public int CantidadPerdida { get; set; }
        public string DescripcionPerdida { get; set; }
        public int? TotalPerdida { get; set; }
    }
}
