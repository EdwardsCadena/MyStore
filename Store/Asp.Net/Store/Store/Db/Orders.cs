//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Store.Db
{
    using System;
    using System.Collections.Generic;
    
    public partial class Orders
    {
        public int OrderID { get; set; }
        public Nullable<int> UserId { get; set; }
        public Nullable<int> ProductID { get; set; }
        public Nullable<int> Quantity { get; set; }
        public Nullable<System.DateTime> OrderDate { get; set; }
        public Nullable<System.DateTime> createdAt { get; set; }
        public Nullable<System.DateTime> updatedAt { get; set; }
    
        public virtual Products Products { get; set; }
        public virtual Users Users { get; set; }
    }
}
