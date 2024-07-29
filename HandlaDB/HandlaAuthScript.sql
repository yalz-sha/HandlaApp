-- User Registration SP
CREATE PROCEDURE RegisterUser
    @Username NVARCHAR(50),
    @Email NVARCHAR(100),
    @Password NVARCHAR(255)
AS
BEGIN
    INSERT INTO Users (username, email, password, created_at)
    VALUES (@Username, @Email, @Password, GETDATE());
END;
GO

-- User Login SP
CREATE PROCEDURE LoginUser
    @Username NVARCHAR(100),
    @Password NVARCHAR(255)
AS
BEGIN
    SELECT * FROM Users WHERE username = @Username AND password = @Password;
END;
GO

