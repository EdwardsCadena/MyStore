using Store.Datos;
using Store.Db;
using System;
using System.Web.UI.WebControls;

namespace Store.Pages
{
    public partial class UsersPage : System.Web.UI.Page
    {
        private readonly UserAdmin admin = new UserAdmin();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                Consultar();
            }
        }

        protected void Save_Click(object sender, EventArgs e)
        {
            Guardar();
            Consultar();
        }

        private void Consultar()
        {
            UsersGridView.DataSource = admin.ConsultarUsers();
            UsersGridView.DataBind();
        }

        private void Guardar()
        {
            Users modelo = new Users()
            {
                Name = TxtName.Text,
                Email = Txtemail.Text,
                CreationDate = DateTime.Now // Establecer la fecha y hora actual
            };
            admin.Guardar(modelo);
            Consultar();
        }

        private void Editar(int userId, string nuevoNombre, string nuevoEmail)
        {
            Users usuarioAEditar = admin.ObtenerUsuarioPorId(userId);

            if (usuarioAEditar != null)
            {
                string nombreOriginal = usuarioAEditar.Name;
                string emailOriginal = usuarioAEditar.Email;

                if (nombreOriginal != nuevoNombre)
                {
                    usuarioAEditar.Name = nuevoNombre;
                }
                if (emailOriginal != nuevoEmail)
                {
                    usuarioAEditar.Email = nuevoEmail;
                }

                usuarioAEditar.UpdateDate = DateTime.Now;
                admin.ActualizarUsuario(usuarioAEditar);
            }
        }

        private void Eliminar(int userId)
        {
            Users usuarioAEliminar = admin.ObtenerUsuarioPorId(userId);

            if (usuarioAEliminar != null)
            {
                // Eliminar el usuario de la base de datos
                admin.EliminarUsuario(usuarioAEliminar);
            }
        }

        protected void UsersGridView_RowEditing(object sender, GridViewEditEventArgs e)
        {
            UsersGridView.EditIndex = e.NewEditIndex;
            Consultar();
        }

        protected void UsersGridView_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            UsersGridView.EditIndex = -1;
            Consultar();
        }

        protected void UsersGridView_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            GridViewRow row = UsersGridView.Rows[e.RowIndex];
            int userId = Convert.ToInt32(UsersGridView.DataKeys[e.RowIndex].Value);
            string nuevoNombre = ((TextBox)row.FindControl("txtupName")).Text;
            string nuevoEmail = ((TextBox)row.FindControl("txtupEmail")).Text;
            Editar(userId, nuevoNombre, nuevoEmail);
            UsersGridView.EditIndex = -1;
            Consultar(); 
        }

        protected void UsersGridView_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            int userId = Convert.ToInt32(UsersGridView.DataKeys[e.RowIndex].Value);
            Eliminar(userId);
            Consultar();
        }

        protected void UsersGridView_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
    }
}
