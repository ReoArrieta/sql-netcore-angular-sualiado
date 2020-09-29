using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class Perdida
    {
        public Perdida()
        {
            DetallePerdida = new HashSet<DetallePerdida>();
        }

        public int Id { get; set; }
        public int IdUsuarioAdmin { get; set; }
        public DateTime FechaPerdida { get; set; }
        public int IdEstadoPerdida { get; set; }

        public virtual Estado IdEstadoPerdidaNavigation { get; set; }
        public virtual Persona IdUsuarioAdminNavigation { get; set; }
        public virtual ICollection<DetallePerdida> DetallePerdida { get; set; }
    }
}
