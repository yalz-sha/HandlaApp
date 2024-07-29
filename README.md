## Handla Application

Handla Application is an eCommerce Application where users can LogIn/SignUp to buy electronic products. As a logged in user you can add products to the cart and place orders in the Checkout page, you can also view your Orders History with details.

## Prerequisites

1. **.NET SDK**: Ensure that .NET 6 SDK is installed. You can download it from [Microsoft .NET Downloads](https://dotnet.microsoft.com/download).
2. **Node.js**: Ensure Node.js and npm are installed. You can download them from [Node.js Official Website](https://nodejs.org/).

## Setting Up the Application

1. **Database Setup**:
   - Use the provided `HandlaSchemaScript.sql` file to set up your MSSQL database Schema.
   - Use the `HandlaAuthScript.sql`, `HandlaOrderScript.sql`, `HandlaProductScript.sql` to set up stored procedures.
   - Connect to your MSSQL localDB and execute the SQL script.
   - Update the `appsettings.json` file with your database connection string in HandlaAPI.

2. **Build and Run the Backend**:
   - Clone the repo in your local machine
   - Navigate to the Handla directory: `cd Handla`
   - Restore dependencies: `dotnet restore`
   - Run the application: `dotnet run`

 3. **Setting Up the Frontend**
   - Navigate to the frontend directory: `cd handla-frontend`
   - Install npm packages: `npm install`
   - Start the development server: `npm start`
   - Open your browser and navigate to `http://localhost:3000`

## Environment Variables

Ensure to set up the following environment variables:

- `DATABASE_CONNECTION_STRING`: Connection string for the MSSQL database.
- `JWT_SECRET`: Secret key for JWT authentication.

## Additional Notes

- Ensure that the backend and frontend are running on the correct ports and can communicate with each other.
- On the first run, please register so as to create data for users. 

## Troubleshooting

- If you encounter any issues, check the console output for errors.
- For database-related issues, ensure that your connection string is correct and the database server is accessible.
