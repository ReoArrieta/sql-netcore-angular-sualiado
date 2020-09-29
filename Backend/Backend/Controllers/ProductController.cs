using System;
using System.Linq;
using Backend.Models;
using Backend.Models.Request;
using Backend.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private IWebHostEnvironment hosting;
        public ProductController(IWebHostEnvironment environment)
        {
            hosting = environment;
        }
        //Métodos para Leer,Crear,Editar,Eliminar los datos de la tabla Categoría
        #region Productos
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.VPdMostrar.OrderBy(p => p.NombreProducto).ToList();
                    res.Exito = 1;
                    res.Data = lst;
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpGet("find/{id}")]
        public IActionResult Find(int id)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.VPdMostrar.Where(p => p.Id == id).ToList();
                    res.Exito = 1;
                    res.Data = lst;
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpGet("name/{nombreProducto}")]
        [AllowAnonymous]
        public IActionResult GetName(string nombreProducto)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.Producto.Where(p => p.NombreProducto == nombreProducto).ToList();
                    if (lst.Count > 0)
                    {
                        res.Exito = 1;
                        res.Data = lst;
                    }
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpPost]
        public IActionResult Add(ProductRequest model)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var valNombre = db.Producto.Where(p => p.NombreProducto == model.NombreProducto.Trim()).FirstOrDefault();
                    if (valNombre == null)
                    {
                        Producto producto = new Producto();
                        producto.NombreProducto = model.NombreProducto.Trim();
                        producto.IdCategoriaProducto = model.IdCategoriaProducto;
                        producto.CostoProducto = model.CostoProducto;
                        producto.PrecioProducto = model.PrecioProducto;
                        producto.ExistenciaProducto = 0;
                        producto.DescripcionProducto = model.DescripcionProducto;
                        producto.IdEstadoProducto = 2;
                        db.Producto.Add(producto);
                        db.SaveChanges();

                        res.Exito = 1;
                    }
                    else if (valNombre != null && valNombre.IdEstadoProducto == 3)
                    {
                        Producto producto = db.Producto.Find(valNombre.Id);
                        producto.CostoProducto = model.CostoProducto;
                        producto.PrecioProducto = model.PrecioProducto;
                        producto.ExistenciaProducto = 0;
                        producto.DescripcionProducto = model.DescripcionProducto;
                        producto.IdEstadoProducto = 2;
                        db.Entry(producto).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                        db.SaveChanges();

                        res.Exito = 1;
                    }
                    else
                        res.Message = "El producto ya existe";
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpPut]
        public IActionResult Edit(ProductRequest model)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    Producto producto = db.Producto.Find(model.Id);
                    producto.NombreProducto = model.NombreProducto.Trim();
                    producto.IdCategoriaProducto = model.IdCategoriaProducto;
                    producto.CostoProducto = model.CostoProducto;
                    producto.PrecioProducto = model.PrecioProducto;
                    producto.DescripcionProducto = model.DescripcionProducto;
                    db.Entry(producto).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();

                    res.Exito = 1;
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpDelete("{Id}")]
        public IActionResult Delete(int Id)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    Producto producto = db.Producto.Find(Id);
                    producto.IdEstadoProducto = 3;
                    db.Entry(producto).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();

                    res.Exito = 1;
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpDelete("return/{Id}")]
        public IActionResult ReturnDelete(int Id)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    Producto producto = db.Producto.Find(Id);
                    producto.IdEstadoProducto = 1;
                    db.Entry(producto).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();

                    res.Exito = 1;
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        #endregion

        //Métodos para Leer,Crear,Editar,Eliminar los datos de la tabla Categoría
        #region Categorías
        [HttpGet("category")]
        public IActionResult GetCategory()
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.Categoria.Where(c => c.IdEstadoCategoria != 3).ToList();

                    res.Exito = 1;
                    res.Data = lst;
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpGet("category/find/{categoriaEspecifica}")]
        public IActionResult GetCategoryName(string categoriaEspecifica)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var lst = db.Categoria.Where(c => c.CategoriaEspecifica == categoriaEspecifica.Trim()).ToList();
                    if (lst.Count > 0)
                    {
                        res.Exito = 1;
                        res.Data = lst;
                    }
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpPost("category")]
        public IActionResult AddCategory(CategoryRequest model)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    var valCategoria = db.Categoria.Where(p => p.CategoriaEspecifica == model.CategoriaEspecifica.Trim()).FirstOrDefault();
                    if (valCategoria == null)
                    {
                        Categoria categoria = new Categoria();
                        categoria.CategoriaGeneral = model.CategoriaGeneral;
                        categoria.CategoriaEspecifica = model.CategoriaEspecifica;
                        categoria.IdEstadoCategoria = 1;
                        db.Categoria.Add(categoria);
                        db.SaveChanges();

                        res.Exito = 1;
                    }
                    else if (valCategoria.IdEstadoCategoria == 3)
                    {
                        Categoria categoria = db.Categoria.Find(valCategoria.Id);
                        categoria.IdEstadoCategoria = 1;
                        db.Entry(categoria).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                        db.SaveChanges();

                        res.Exito = 1;
                    }
                    else
                        res.Message = "La categoría ya existe";
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpPut("category")]
        public IActionResult EditCategory(CategoryRequest model)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    Categoria categoria = db.Categoria.Find(model.Id);
                    categoria.CategoriaGeneral = model.CategoriaGeneral;
                    categoria.CategoriaEspecifica = model.CategoriaEspecifica;
                    db.Entry(categoria).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();

                    res.Exito = 1;
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpDelete("category/{Id}")]

        public IActionResult DeleteCategory(int Id)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    Categoria categoria = db.Categoria.Find(Id);
                    categoria.IdEstadoCategoria = 3;
                    db.Entry(categoria).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();

                    res.Exito = 1;
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        [HttpDelete("category/return/{Id}")]

        public IActionResult ReturnCategory(int Id)
        {
            Response res = new Response();
            try
            {
                using (JobsPhonesCTX db = new JobsPhonesCTX())
                {
                    Categoria categoria = db.Categoria.Find(Id);
                    categoria.IdEstadoCategoria = 1;
                    db.Entry(categoria).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();

                    res.Exito = 1;
                }
            }
            catch (Exception e)
            {
                res.Message = e.Message;
            }
            return Ok(res);
        }
        #endregion
    }
}