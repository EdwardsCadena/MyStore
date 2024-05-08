<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="OrdersPage.aspx.cs" Inherits="Store.Pages.OrdersPage" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <form id="form1">
        <p>
            <table class="auto-style1">
                <tr>
                    <td>UserID:</td>
                    <td>
                        <asp:TextBox ID="TxtUserID" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>ProductID:</td>
                    <td>
                        <asp:TextBox ID="TxtProductID" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>Quantity:</td>
                    <td>
                        <asp:TextBox ID="TxtQuantity" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>OrderDate:</td>
                    <td>
                        <asp:Calendar ID="OrderCalendar" runat="server"></asp:Calendar>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: right;">
                        <asp:Button ID="SaveOrder" runat="server" Text="Add Order" OnClick="SaveOrder_Click" />
                    </td>
                </tr>
            </table>
        </p>
        <br />
        <h2>Orders List</h2>
        <asp:GridView ID="OrdersGridView" runat="server" AutoGenerateColumns="False" CssClass="gridview" Height="128px" Width="209px"
            OnRowEditing="OrdersGridView_RowEditing" OnRowCancelingEdit="OrdersGridView_RowCancelingEdit"
            OnRowUpdating="OrdersGridView_RowUpdating" OnRowDeleting="OrdersGridView_RowDeleting" DataKeyNames="OrderID">
            <Columns>
                <asp:BoundField DataField="UserID" HeaderText="UserID" />
                <asp:BoundField DataField="ProductID" HeaderText="ProductID" />
                <asp:BoundField DataField="Quantity" HeaderText="Quantity" />
                <asp:TemplateField HeaderText="OrderDate">
                    <ItemTemplate>
                        <asp:Label ID="lblOrderDate" runat="server" Text='<%# Bind("OrderDate", "{0:d}") %>'></asp:Label>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:TextBox ID="txtupOrderDate" runat="server" Text='<%# Bind("OrderDate", "{0:d}") %>'></asp:TextBox>
                    </EditItemTemplate>
                </asp:TemplateField>
                <asp:CommandField ShowEditButton="True" ShowDeleteButton="True" />
            </Columns>
        </asp:GridView>
    </form>
</asp:Content>
