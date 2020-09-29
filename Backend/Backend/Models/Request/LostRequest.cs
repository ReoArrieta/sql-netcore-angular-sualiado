using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Request
{
    public class LostRequest
    {
        public int IdUsuarioAdmin { get; set; }
        public List<DetallePrd> Detalles { get; set; }
    }
    public class DetallePrd
    {
        public int IdProductoPerdida { get; set; }
        public int CostoProducto { get; set; }
        public int CantidadPerdida { get; set; }
        public string DescripcionPerdida { get; set; }
    }
}
