using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class DetalleVenta
    {
        public int Id { get; set; }
        public int IdVenta { get; set; }
        public int IdProductoVenta { get; set; }
        public int CantidadVenta { get; set; }
        public int PrecioProducto { get; set; }
        public int DescuentoVenta { get; set; }

        public virtual Producto IdProductoVentaNavigation { get; set; }
        public virtual Venta IdVentaNavigation { get; set; }
    }
}
