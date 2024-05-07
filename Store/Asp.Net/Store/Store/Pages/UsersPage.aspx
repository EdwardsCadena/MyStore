<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="UsersPage.aspx.cs" Inherits="Store.Pages.UsersPage" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <form id="form1">
        <p>
            <table class="auto-style1">
                <tr>
                    <td>Name :</td>
                    <td>
                        <asp:TextBox ID="TxtName" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>
                        <asp:TextBox ID="Txtemail" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: right;">
                        <asp:Button ID="Save" runat="server" Text="Register" OnClick="Save_Click" />
                    </td>
                </tr>
            </table>
        </p>
        <br />
        <h2>Users List</h2>
        <asp:GridView ID="UsersGridView" runat="server" AutoGenerateColumns="False" CssClass="gridview" Height="128px" Width="209px"
    OnRowEditing="UsersGridView_RowEditing" OnRowCancelingEdit="UsersGridView_RowCancelingEdit"
    OnRowUpdating="UsersGridView_RowUpdating" OnRowDeleting="UsersGridView_RowDeleting" DataKeyNames="UserId">
    <Columns>
        <asp:TemplateField HeaderText="Name">
            <ItemTemplate>
                <asp:Label ID="lblName" runat="server" Text='<%# Bind("Name") %>'></asp:Label>
            </ItemTemplate>
            <EditItemTemplate>
                <asp:TextBox ID="txtupName" runat="server" Text='<%# Bind("Name") %>'></asp:TextBox>
            </EditItemTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="Email">
            <ItemTemplate>
                <asp:Label ID="lblEmail" runat="server" Text='<%# Bind("Email") %>'></asp:Label>
            </ItemTemplate>
            <EditItemTemplate>
                <asp:TextBox ID="txtupEmail" runat="server" Text='<%# Bind("Email") %>'></asp:TextBox>
            </EditItemTemplate>
        </asp:TemplateField>
        <asp:CommandField ShowEditButton="True" ShowDeleteButton="True" />
    </Columns>
</asp:GridView>


        <p>
            <asp:TextBox ID="txtupName" runat="server" Visible="False"></asp:TextBox>
            <asp:TextBox ID="txtupEmail" runat="server" Visible="False"></asp:TextBox>
        </p>
    </form>
</asp:Content>
