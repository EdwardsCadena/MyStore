using Store.Datos;
using Store.Db;
using System;
using System.Web.UI.WebControls;

namespace Store.Pages
{
    public partial class OrdersPage : System.Web.UI.Page
    {
        private readonly OrderAdmin admin = new OrderAdmin();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                Consultar();
            }
        }

        protected void SaveOrder_Click(object sender, EventArgs e)
        {
            Guardar();
            Consultar();
        }

        private void Consultar()
        {
            OrdersGridView.DataSource = admin.ConsultarOrdenes();
            OrdersGridView.DataBind();
        }

        private void Guardar()
        {
            Orders modelo = new Orders()
            {
                UserId = Convert.ToInt32(TxtUserID.Text),
                ProductID = Convert.ToInt32(TxtProductID.Text),
                Quantity = Convert.ToInt32(TxtQuantity.Text),
                OrderDate = OrderCalendar.SelectedDate.Date,
                createdAt = DateTime.Now // Establecer la fecha y hora actual
            };
            admin.GuardarOrden(modelo);
            Consultar();
        }

        private void Editar(int orderId, int newUserId, int newProductId, int newQuantity, DateTime newOrderDate)
        {
            Orders orderAEditar = admin.ObtenerOrdenPorId(orderId);

            if (orderAEditar != null)
            {
                orderAEditar.UserId = newUserId;
                orderAEditar.ProductID = newProductId;
                orderAEditar.Quantity = newQuantity;
                orderAEditar.OrderDate = newOrderDate;
                orderAEditar.updatedAt = DateTime.Now;

                admin.ActualizarOrden(orderAEditar);
            }
        }

        private void Eliminar(int orderId)
        {
            Orders orderAEliminar = admin.ObtenerOrdenPorId(orderId);

            if (orderAEliminar != null)
            {
                admin.EliminarOrden(orderAEliminar);
            }
        }

        protected void OrdersGridView_RowEditing(object sender, GridViewEditEventArgs e)
        {
            OrdersGridView.EditIndex = e.NewEditIndex;
            Consultar();
        }

        protected void OrdersGridView_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            OrdersGridView.EditIndex = -1;
            Consultar();
        }

        protected void OrdersGridView_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            GridViewRow row = OrdersGridView.Rows[e.RowIndex];
            int orderId = Convert.ToInt32(OrdersGridView.DataKeys[e.RowIndex].Value);
            int newUserId = Convert.ToInt32(((TextBox)row.FindControl("txtupUserID")).Text);
            int newProductId = Convert.ToInt32(((TextBox)row.FindControl("txtupProductID")).Text);
            int newQuantity = Convert.ToInt32(((TextBox)row.FindControl("txtupQuantity")).Text);
            DateTime newOrderDate = OrderCalendar.SelectedDate;
            Editar(orderId, newUserId, newProductId, newQuantity, newOrderDate);
            OrdersGridView.EditIndex = -1;
            Consultar();
        }

        protected void OrdersGridView_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            int orderId = Convert.ToInt32(OrdersGridView.DataKeys[e.RowIndex].Value);
            Eliminar(orderId);
            Consultar();
        }
    }
}
