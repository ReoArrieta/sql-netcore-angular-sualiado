using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class Categoria
    {
        public Categoria()
        {
            Producto = new HashSet<Producto>();
        }

        public int Id { get; set; }
        public string CategoriaGeneral { get; set; }
        public string CategoriaEspecifica { get; set; }
        public int IdEstadoCategoria { get; set; }

        public virtual Estado IdEstadoCategoriaNavigation { get; set; }
        public virtual ICollection<Producto> Producto { get; set; }
    }
}
