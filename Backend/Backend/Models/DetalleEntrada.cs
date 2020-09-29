using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class DetalleEntrada
    {
        public int Id { get; set; }
        public int IdEntrada { get; set; }
        public int IdProductoEntrada { get; set; }
        public int CostoProducto { get; set; }
        public int CantidadEntrada { get; set; }

        public virtual Entrada IdEntradaNavigation { get; set; }
        public virtual Producto IdProductoEntradaNavigation { get; set; }
    }
}
