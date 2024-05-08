using Store.Db;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Store.Datos
{
    public class ProductsAdmin
    {
        public void GuardarProducto(Products modelo)
        {
            using (Mystores contexto = new Mystores())
            {
                contexto.Products.Add(modelo);
                contexto.SaveChanges();
            }
        }

        public List<Products> ConsultarProductos()
        {
            using (Mystores contexto = new Mystores())
            {
                return contexto.Products.AsNoTracking().ToList();
            }
        }

        public Products ObtenerProductoPorId(int productId)
        {
            using (Mystores contexto = new Mystores())
            {
                return contexto.Products.FirstOrDefault(p => p.ProductID == productId);
            }
        }

        public void ActualizarProducto(Products producto)
        {
            using (Mystores contexto = new Mystores())
            {
                contexto.Entry(producto).State = EntityState.Modified;
                producto.updatedAt = DateTime.Now;
                contexto.SaveChanges();
            }
        }

        public void EliminarProducto(Products producto)
        {
            using (Mystores contexto = new Mystores())
            {
                contexto.Entry(producto).State = EntityState.Deleted;
                contexto.SaveChanges();
            }
        }
    }

}