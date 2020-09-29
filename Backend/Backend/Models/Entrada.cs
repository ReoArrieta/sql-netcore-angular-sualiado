using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class Entrada
    {
        public Entrada()
        {
            DetalleEntrada = new HashSet<DetalleEntrada>();
        }

        public int Id { get; set; }
        public int IdUsuarioAdmin { get; set; }
        public int IdProveedorEntrada { get; set; }
        public DateTime FechaEntrada { get; set; }
        public int IdEstadoEntrada { get; set; }

        public virtual Estado IdEstadoEntradaNavigation { get; set; }
        public virtual Proveedor IdProveedorEntradaNavigation { get; set; }
        public virtual Persona IdUsuarioAdminNavigation { get; set; }
        public virtual ICollection<DetalleEntrada> DetalleEntrada { get; set; }
    }
}
