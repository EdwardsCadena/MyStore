<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ProductsPage.aspx.cs" Inherits="Store.Pages.ProductsPage" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <form id="form1">
        <p>
            <table class="auto-style1">
                <tr>
                    <td>Name :</td>
                    <td>
                        <asp:TextBox ID="TxtProductName" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>Price:</td>
                    <td>
                        <asp:TextBox ID="TxtProductPrice" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: right;">
                        <asp:Button ID="SaveProduct" runat="server" Text="Add Product" OnClick="SaveProduct_Click" />
                    </td>
                </tr>
            </table>
        </p>
        <br />
        <h2>Products List</h2>
        <asp:GridView ID="ProductsGridView" runat="server" AutoGenerateColumns="False" CssClass="gridview" Height="128px" Width="209px"
            OnRowEditing="ProductsGridView_RowEditing" OnRowCancelingEdit="ProductsGridView_RowCancelingEdit"
            OnRowUpdating="ProductsGridView_RowUpdating" OnRowDeleting="ProductsGridView_RowDeleting" DataKeyNames="ProductID">
            <Columns>
                <asp:TemplateField HeaderText="Name">
                    <ItemTemplate>
                        <asp:Label ID="lblProductName" runat="server" Text='<%# Bind("Name") %>'></asp:Label>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:TextBox ID="txtupProductName" runat="server" Text='<%# Bind("Name") %>'></asp:TextBox>
                    </EditItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Price">
                    <ItemTemplate>
                        <asp:Label ID="lblProductPrice" runat="server" Text='<%# Bind("Price") %>'></asp:Label>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:TextBox ID="txtupProductPrice" runat="server" Text='<%# Bind("Price") %>'></asp:TextBox>
                    </EditItemTemplate>
                </asp:TemplateField>
                <asp:CommandField ShowEditButton="True" ShowDeleteButton="True" />
            </Columns>
        </asp:GridView>
    </form>
</asp:Content>
