using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Request
{
    public class SaleRequest
    {
        public int IdUsuarioAdmin { get; set; }
        public int IdUsuarioCliente { get; set; }

        public List<DetalleVnt> Detalles { get; set; }
    }
    public class DetalleVnt
    { 
        public int IdProductoVenta { get; set; }
        public int CantidadVenta { get; set; }
        public int PrecioProducto { get; set; }
        public int DescuentoVenta { get; set; }
    }
}
