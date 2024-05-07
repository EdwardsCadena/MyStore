--Postgres
-- Clients table with creation and update fields
CREATE TABLE Users (
    UserId SERIAL PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table with creation and update fields
CREATE TABLE Products (
    ProductID SERIAL PRIMARY KEY,
    Name VARCHAR(100),
    Price DECIMAL(10, 2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table with creation and update fields
CREATE TABLE Orders (
    OrderID SERIAL PRIMARY KEY,
    UserId INT,
    ProductID INT,
    Quantity INT,
    OrderDate DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- Alter table to add ON UPDATE constraint for updatedAt field
ALTER TABLE Users ALTER COLUMN updatedAt SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Products ALTER COLUMN updatedAt SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Orders ALTER COLUMN updatedAt SET DEFAULT CURRENT_TIMESTAMP;

-- Stored procedure to get all products
CREATE OR REPLACE PROCEDURE GetAllProducts()
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT * FROM Products;
END;
$$;

-- Stored procedure to get a product by its ID
CREATE OR REPLACE PROCEDURE GetProductByID(
    p_product_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT * FROM Products WHERE ProductID = p_product_id;
END;
$$;

-- Stored procedure to insert a new product
CREATE OR REPLACE PROCEDURE InsertProduct(
    p_name VARCHAR(100),
    p_price DECIMAL(10, 2)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Products (Name, Price, createdAt, updatedAt)
    VALUES (p_name, p_price, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END;
$$;

-- Stored procedure to update an existing product
CREATE OR REPLACE PROCEDURE UpdateProduct(
    p_product_id INT,
    p_name VARCHAR(100),
    p_price DECIMAL(10, 2)
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Products
    SET Name = p_name,
        Price = p_price,
        updatedAt = CURRENT_TIMESTAMP
    WHERE ProductID = p_product_id;
END;
$$;

-- Stored procedure to delete a product
CREATE OR REPLACE PROCEDURE DeleteProduct(
    p_product_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM Products
    WHERE ProductID = p_product_id;
END;
$$;

-- Function to retrieve all products
CREATE OR REPLACE FUNCTION public.get_all_products(
    )
    RETURNS TABLE(product_id integer, name character varying, price numeric) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000
AS $BODY$
BEGIN
    RETURN QUERY SELECT Products.ProductID, Products.Name, Products.Price FROM Products;
END;
$BODY$;

-- Function to retrieve a product by its ID
CREATE OR REPLACE FUNCTION public.get_product_by_id(
	p_product_id integer)
    RETURNS TABLE(product_id integer, name character varying, price numeric) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY SELECT Products.ProductID, Products.Name, Products.Price FROM Products WHERE Products.ProductID = p_product_id;
END;
$BODY$;

ALTER FUNCTION public.get_product_by_id(integer)
    OWNER TO postgres;