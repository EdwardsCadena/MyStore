using Microsoft.Ajax.Utilities;
using Store.Db;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using System.Web.UI;
using Store.Datos;
using System.Xml.Linq;

namespace Store.Datos
{
    using Store.Db;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;

    public class UserAdmin
    {
        public void Guardar(Users modelo)
        {
            using (Mystore contexto = new Mystore())
            {
                contexto.Users.Add(modelo);
                contexto.SaveChanges();
            }
        }

        public List<Users> ConsultarUsers()
        {
            using (Mystore contexto = new Mystore())
            {
                return contexto.Users.AsNoTracking().ToList();
            }
        }
 

        public Users ObtenerUsuarioPorId(int userId)
        {
            using (Mystore contexto = new Mystore())
            {
                return contexto.Users.FirstOrDefault(u => u.UserId == userId);
            }
        }

        public void ActualizarUsuario(Users usuario)
        {
            using (Mystore contexto = new Mystore())
            {
                contexto.Entry(usuario).State = EntityState.Modified;
                contexto.SaveChanges();
            }
        }

        public void EliminarUsuario(Users usuario)
        {
            using (Mystore contexto = new Mystore())
            {
                contexto.Entry(usuario).State = EntityState.Deleted;
                contexto.SaveChanges();
            }
        }
    }

}


