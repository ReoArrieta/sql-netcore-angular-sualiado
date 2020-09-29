using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class Estado
    {
        public Estado()
        {
            Categoria = new HashSet<Categoria>();
            Entrada = new HashSet<Entrada>();
            Perdida = new HashSet<Perdida>();
            Persona = new HashSet<Persona>();
            Producto = new HashSet<Producto>();
            Proveedor = new HashSet<Proveedor>();
        }

        public int Id { get; set; }
        public string TipoEstado { get; set; }

        public virtual ICollection<Categoria> Categoria { get; set; }
        public virtual ICollection<Entrada> Entrada { get; set; }
        public virtual ICollection<Perdida> Perdida { get; set; }
        public virtual ICollection<Persona> Persona { get; set; }
        public virtual ICollection<Producto> Producto { get; set; }
        public virtual ICollection<Proveedor> Proveedor { get; set; }
    }
}
