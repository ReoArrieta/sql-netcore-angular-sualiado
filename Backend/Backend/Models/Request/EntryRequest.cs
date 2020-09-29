using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Request
{
    public class EntryRequest
    {
        public int IdUsuarioAdmin { get; set; }
        public int IdProveedorEntrada { get; set; }
        public List<DetalleEtd> Detalles { get; set; }
    }
    public class DetalleEtd
    {
        public int IdProductoEntrada { get; set; }
        public int CostoProducto { get; set; }
        public int CantidadEntrada { get; set; }
    } 
}
