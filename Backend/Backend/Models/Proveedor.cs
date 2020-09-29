using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class Proveedor
    {
        public Proveedor()
        {
            Entrada = new HashSet<Entrada>();
        }

        public int Id { get; set; }
        public string NombreProveedor { get; set; }
        public string NitProveedor { get; set; }
        public string DireccionProveedor { get; set; }
        public string TelefonoProveedor { get; set; }
        public string UrlProveedor { get; set; }
        public int IdEstadoProveedor { get; set; }

        public virtual Estado IdEstadoProveedorNavigation { get; set; }
        public virtual ICollection<Entrada> Entrada { get; set; }
    }
}
