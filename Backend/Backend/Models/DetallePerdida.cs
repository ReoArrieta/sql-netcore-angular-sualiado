using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class DetallePerdida
    {
        public int Id { get; set; }
        public int IdPerdida { get; set; }
        public int IdProductoPerdida { get; set; }
        public int CostoProducto { get; set; }
        public int CantidadPerdida { get; set; }
        public string DescripcionPerdida { get; set; }

        public virtual Perdida IdPerdidaNavigation { get; set; }
        public virtual Producto IdProductoPerdidaNavigation { get; set; }
    }
}
