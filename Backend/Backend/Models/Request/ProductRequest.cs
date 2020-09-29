using System;
using System.Web;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace Backend.Models.Request
{
    public class ProductRequest
    {
        public int Id { get; set; }
        public string NombreProducto { get; set; }
        public int IdCategoriaProducto { get; set; }
        public int CostoProducto { get; set; }
        public int PrecioProducto { get; set; }

        public IFormFile ImagenProducto { get; set; }
        public string DescripcionProducto { get; set; }
    }
}
