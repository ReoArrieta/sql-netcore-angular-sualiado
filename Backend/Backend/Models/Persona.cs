using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class Persona
    {
        public Persona()
        {
            Entrada = new HashSet<Entrada>();
            Perdida = new HashSet<Perdida>();
            VentaIdEstadoVentaNavigation = new HashSet<Venta>();
            VentaIdUsuarioAdminNavigation = new HashSet<Venta>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Cedula { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Correo { get; set; }
        public string Contrasena { get; set; }
        public string Usuario { get; set; }
        public string Telefono { get; set; }
        public int TipoRol { get; set; }
        public int IdEstado { get; set; }
        public string Jwt { get; set; }
        public string Token { get; set; }

        public virtual Estado IdEstadoNavigation { get; set; }
        public virtual ICollection<Entrada> Entrada { get; set; }
        public virtual ICollection<Perdida> Perdida { get; set; }
        public virtual ICollection<Venta> VentaIdEstadoVentaNavigation { get; set; }
        public virtual ICollection<Venta> VentaIdUsuarioAdminNavigation { get; set; }
    }
}
