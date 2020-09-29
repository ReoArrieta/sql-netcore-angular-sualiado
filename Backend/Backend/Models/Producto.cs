using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class Producto
    {
        public Producto()
        {
            DetalleEntrada = new HashSet<DetalleEntrada>();
            DetallePerdida = new HashSet<DetallePerdida>();
            DetalleVenta = new HashSet<DetalleVenta>();
        }

        public int Id { get; set; }
        public string NombreProducto { get; set; }
        public int IdCategoriaProducto { get; set; }
        public int CostoProducto { get; set; }
        public int PrecioProducto { get; set; }
        public int ExistenciaProducto { get; set; }
        public string DescripcionProducto { get; set; }
        public string ImagenProducto { get; set; }
        public int IdEstadoProducto { get; set; }

        public virtual Categoria IdCategoriaProductoNavigation { get; set; }
        public virtual Estado IdEstadoProductoNavigation { get; set; }
        public virtual ICollection<DetalleEntrada> DetalleEntrada { get; set; }
        public virtual ICollection<DetallePerdida> DetallePerdida { get; set; }
        public virtual ICollection<DetalleVenta> DetalleVenta { get; set; }
    }
}
