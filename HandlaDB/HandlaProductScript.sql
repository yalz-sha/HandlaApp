-- Add Product 
CREATE PROCEDURE AddProduct
    @Name NVARCHAR(100),
    @Description TEXT,
    @Price DECIMAL(10, 2),
    @Stock INT
AS
BEGIN
    INSERT INTO Products (name, description, price, stock, created_at)
    VALUES (@Name, @Description, @Price, @Stock, GETDATE());
END;
GO

-- Get Products 
CREATE PROCEDURE GetProducts
AS
BEGIN
    SELECT * FROM Products;
END;
GO

-- Update Product 
CREATE PROCEDURE UpdateProduct
    @Id INT,
    @Name NVARCHAR(100),
    @Description TEXT,
    @Price DECIMAL(18, 2),
    @Stock INT
AS
BEGIN
    UPDATE Products
    SET Name = @Name, Description = @Description, Price = @Price, Stock = @Stock
    WHERE Id = @Id;
END;
GO

-- Delete Product 
CREATE PROCEDURE DeleteProduct
    @Id INT
AS
BEGIN
    DELETE FROM Products WHERE Id = @Id;
END;
GO
