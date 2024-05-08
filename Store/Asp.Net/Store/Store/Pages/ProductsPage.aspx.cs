using Store.Datos;
using Store.Db;
using System;
using System.Web.UI.WebControls;

namespace Store.Pages
{
    public partial class ProductsPage : System.Web.UI.Page
    {
        private readonly ProductsAdmin admin = new ProductsAdmin();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                Consultar();
            }
        }

        protected void SaveProduct_Click(object sender, EventArgs e)
        {
            Guardar();
            Consultar();
        }

        private void Consultar()
        {
            ProductsGridView.DataSource = admin.ConsultarProductos();
            ProductsGridView.DataBind();
        }

        private void Guardar()
        {
            Products modelo = new Products()
            {
                Name = TxtProductName.Text,
                Price = Convert.ToDecimal(TxtProductPrice.Text),
                createdAt = DateTime.Now // Establecer la fecha y hora actual
            };
            admin.GuardarProducto(modelo);
            Consultar();
        }

        private void Editar(int productId, string nuevoNombre, decimal nuevoPrecio)
        {
            Products productoAEditar = admin.ObtenerProductoPorId(productId);

            if (productoAEditar != null)
            {
                string nombreOriginal = productoAEditar.Name;
                decimal precioOriginal = (decimal)productoAEditar.Price;

                if (nombreOriginal != nuevoNombre)
                {
                    productoAEditar.Name = nuevoNombre;
                }
                if (precioOriginal != nuevoPrecio)
                {
                    productoAEditar.Price = nuevoPrecio;
                }

                productoAEditar.updatedAt = DateTime.Now;
                admin.ActualizarProducto(productoAEditar);
            }
        }

        private void Eliminar(int productId)
        {
            Products productoAEliminar = admin.ObtenerProductoPorId(productId);

            if (productoAEliminar != null)
            {
                admin.EliminarProducto(productoAEliminar);
            }
        }

        protected void ProductsGridView_RowEditing(object sender, GridViewEditEventArgs e)
        {
            ProductsGridView.EditIndex = e.NewEditIndex;
            Consultar();
        }

        protected void ProductsGridView_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            ProductsGridView.EditIndex = -1;
            Consultar();
        }

        protected void ProductsGridView_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            GridViewRow row = ProductsGridView.Rows[e.RowIndex];
            int productId = Convert.ToInt32(ProductsGridView.DataKeys[e.RowIndex].Value);
            string nuevoNombre = ((TextBox)row.FindControl("txtupProductName")).Text;
            decimal nuevoPrecio = Convert.ToDecimal(((TextBox)row.FindControl("txtupProductPrice")).Text);
            Editar(productId, nuevoNombre, nuevoPrecio);
            ProductsGridView.EditIndex = -1;
            Consultar();
        }

        protected void ProductsGridView_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            int productId = Convert.ToInt32(ProductsGridView.DataKeys[e.RowIndex].Value);
            Eliminar(productId);
            Consultar();
        }
    }
}

