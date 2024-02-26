# Online Store

## Introduction

This is a web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It serves as an online store platform with functionalities for both administrators and users.

## Features

### For Admins:
- Create new products with name, category, variants, price, and stock.
- View and manage existing products.
- Edit product details including name, category, variants, price, and stock.
- Delete products from the store inventory.

### For Users:
- Browse through the list of available products.
- Search products by category, variant, or name.
- Filter products based on search queries or selected filters.
- View product details including name, category, variants, price, and stock availability.
- Differentiate between in-stock and out-of-stock products through UI indicators.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **State Management**: Redux toolkit
- **Routing**: React Router dom
- **API Testing**: Postman
- **API Testing**: JWT

# Running Instructions

Follow these steps to set up and run the MERN stack online store project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js and npm: [Download & Install Node.js](https://nodejs.org/)
- MongoDB: [Download & Install MongoDB](https://docs.mongodb.com/manual/installation/)

## Installation

1. **Clone the Repository:**

2. **Navigate to the Project Directory:**
     cd mern-online-store


3.**Configure Environment Variables**:
   -Create a .env file in the server directory.
   -Define the following variables:
   -MONGODB_URI: MongoDB connection URI
   -Example: MONGODB_URI=mongodb://localhost:27017/your_database_name
   -Other configuration variables as needed

4. **Install Dependencies for Frontend and Backend:**
    cd client && npm install
    cd ../server && npm install


## Running the Application

1. **Start the Backend Server:**
   cd ../server && npm start


2. **Start the Frontend Development Server:**
   cd ../client && npm run dev


3. **Access the Application:**
- Open your web browser and navigate to `http://localhost:3000` to access the online store.

## Folder Structure

- `client`: Contains frontend codebase.
- `server`: Contains backend codebase.
