using Store.Db;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Store.Datos
{
    public class OrderAdmin
    {
        public void GuardarOrden(Orders modelo)
        {
            using (Mystores contexto = new Mystores())
            {
                contexto.Orders.Add(modelo);
                contexto.SaveChanges();
            }
        }

        public List<Orders> ConsultarOrdenes()
        {
            using (Mystores contexto = new Mystores())
            {
                return contexto.Orders.AsNoTracking().ToList();
            }
        }

        public Orders ObtenerOrdenPorId(int orderId)
        {
            using (Mystores contexto = new Mystores())
            {
                return contexto.Orders.FirstOrDefault(o => o.OrderID == orderId);
            }
        }

        public void ActualizarOrden(Orders orden)
        {
            using (Mystores contexto = new Mystores())
            {
                contexto.Entry(orden).State = EntityState.Modified;
                orden.updatedAt = DateTime.Now;
                contexto.SaveChanges();
            }
        }

        public void EliminarOrden(Orders orden)
        {
            using (Mystores contexto = new Mystores())
            {
                contexto.Entry(orden).State = EntityState.Deleted;
                contexto.SaveChanges();
            }
        }
    }
}