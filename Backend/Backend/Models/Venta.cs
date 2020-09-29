using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class Venta
    {
        public Venta()
        {
            DetalleVenta = new HashSet<DetalleVenta>();
        }

        public int Id { get; set; }
        public int IdUsuarioAdmin { get; set; }
        public int IdUsuarioCliente { get; set; }
        public DateTime FechaVenta { get; set; }
        public int IdEstadoVenta { get; set; }

        public virtual Persona IdEstadoVentaNavigation { get; set; }
        public virtual Persona IdUsuarioAdminNavigation { get; set; }
        public virtual ICollection<DetalleVenta> DetalleVenta { get; set; }
    }
}
