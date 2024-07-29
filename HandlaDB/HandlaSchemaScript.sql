--Create Schema
CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Products (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Orders (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT FOREIGN KEY REFERENCES Users(id),
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Completed',
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE OrderItems (
    id INT PRIMARY KEY IDENTITY(1,1),
    order_id INT FOREIGN KEY REFERENCES Orders(id),
    product_id INT FOREIGN KEY REFERENCES Products(id),
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

--InsertProducts into Products Table
INSERT INTO Products (name, description, price, stock, created_at) VALUES
('One Plus Phone', 'A high-end smartphone with 128GB storage and 6GB RAM.', 15999.00, 50, GETDATE()),
('Laptop Air', 'A powerful laptop with Intel i7 processor and 16GB RAM.', 51999.00, 30, GETDATE()),
('Wireless Headphones', 'Noise-cancelling over-ear wireless headphones.', 1999.00, 100, GETDATE()),
('Smartwatch', 'A smartwatch with fitness tracking and heart rate monitor.', 2499.00, 75, GETDATE()),
('4K Ultra HD TV', '55-inch 4K Ultra HD Smart TV with HDR.', 3500.00, 20, GETDATE()),
('Bluetooth Speaker', 'Portable Bluetooth speaker with 12 hours of battery life.', 999.00, 150, GETDATE()),
('Digital Camera', '24MP digital camera with 4K video recording.', 39999.00, 25, GETDATE()),
('Robot Vacuum Cleaner', 'Smart robot vacuum cleaner with WiFi connectivity.', 5399.00, 35, GETDATE()),
('Air Purifier', 'HEPA air purifier with real-time air quality monitoring.', 6149.00, 80, GETDATE()),
('Electric Toothbrush', 'Rechargeable electric toothbrush with multiple brushing modes.', 379.00, 120, GETDATE()),
('Gaming Mouse', 'Ergonomic gaming mouse with customizable buttons and RGB lighting.', 249.00, 90, GETDATE());
