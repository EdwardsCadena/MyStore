--Sqlserver
create database Store
use store
-- Clients table with creation and update fields
CREATE TABLE Users(
    UserId INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100),
    Email NVARCHAR(100),
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

-- Products table with creation and update fields
CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100),
    Price DECIMAL(10, 2),
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

-- Orders table with creation and update fields
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY,
    UserId INT,
    ProductID INT,
    Quantity INT,
    OrderDate DATE,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);


-- Procedimiento almacenado para insertar un nuevo producto
Go
CREATE PROCEDURE InsertProduct
    @Name NVARCHAR(100),
    @Price DECIMAL(10, 2)
AS
BEGIN
    INSERT INTO Products (Name, Price, createdAt, updatedAt)
    VALUES (@Name, @Price, GETDATE(), GETDATE());
END;

-- Procedimiento almacenado para actualizar un producto existente
Go
CREATE PROCEDURE UpdateProduct
    @ProductID INT,
    @Name NVARCHAR(100),
    @Price DECIMAL(10, 2)
AS
BEGIN
    UPDATE Products
    SET Name = @Name,
        Price = @Price,
        updatedAt = GETDATE()
    WHERE ProductID = @ProductID;
END;

-- Procedimiento almacenado para obtener todos los productos
Go
CREATE PROCEDURE GetProducts
AS
BEGIN
    SELECT * FROM Products;
END;

-- Procedimiento almacenado para obtener un producto por su ID
Go
CREATE PROCEDURE GetProductByID
    @ProductID INT
AS
BEGIN
    SELECT * FROM Products WHERE ProductID = @ProductID;
END;

-- Procedimiento almacenado para eliminar un producto por su ID
Go
CREATE PROCEDURE DeleteProduct
    @ProductID INT
AS
BEGIN
    DELETE FROM Products WHERE ProductID = @ProductID;
END;
