-- Create Order 
CREATE PROCEDURE CreateOrder
    @UserId INT,
    @TotalPrice DECIMAL(18, 2),
    @Status NVARCHAR(50)
AS
BEGIN
    INSERT INTO Orders (user_id, total_price, Status, created_at)
    VALUES (@UserId, @TotalPrice, @Status, GETDATE());
    SELECT SCOPE_IDENTITY() AS OrderId;
END;
GO

-- Add OrderItem 
CREATE PROCEDURE AddOrderItem
    @OrderId INT,
    @ProductId INT,
    @Quantity INT,
    @Price DECIMAL(10, 2)
AS
BEGIN
    INSERT INTO OrderItems (order_id, product_id, quantity, price)
    VALUES (@OrderId, @ProductId, @Quantity, @Price);
END;
GO

-- Get Orders 
CREATE PROCEDURE GetOrders
    @UserId INT
AS
BEGIN
    SELECT * FROM Orders WHERE user_id = @UserId;
END;
GO

-- Get Order Details 
CREATE PROCEDURE GetOrderDetails
    @OrderId INT
AS
BEGIN
    SELECT *,name FROM OrderItems O
	LEFT JOIN Products P on O.product_id = P.id
	WHERE order_id = @OrderId;
END;
GO
