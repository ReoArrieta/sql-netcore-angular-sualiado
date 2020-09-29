using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class VPdMostrar
    {
        public int Id { get; set; }
        public string NombreProducto { get; set; }
        public int IdCategoriaProducto { get; set; }
        public string CategoriaEspecifica { get; set; }
        public int CostoProducto { get; set; }
        public int PrecioProducto { get; set; }
        public int ExistenciaProducto { get; set; }
        public string DescripcionProducto { get; set; }
        public string ImagenProducto { get; set; }
    }
}
