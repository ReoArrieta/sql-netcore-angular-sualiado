using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class VPrMostrar
    {
        public int Id { get; set; }
        public int IdUsuarioAdmin { get; set; }
        public string Admin { get; set; }
        public DateTime FechaPerdida { get; set; }
        public int? Total { get; set; }
    }
}
