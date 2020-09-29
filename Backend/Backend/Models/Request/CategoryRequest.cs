using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Request
{
    public class CategoryRequest
    {
        public int Id { get; set; }
        public string CategoriaGeneral { get; set; }
        public string CategoriaEspecifica { get; set; }
    }
}
