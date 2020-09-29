using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Response
{
    public class Response
    {
        public int Exito { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
        public Response()
        {
            this.Exito = 0;
        }
    }
}
