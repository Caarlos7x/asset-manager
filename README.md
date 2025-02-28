# IT Asset Management System

## Overview

The IT Asset Management System is a full-stack web application designed for managing IT assets within an organization. This system allows users to track and manage various hardware, software, and network assets, providing real-time insights into asset distribution, statuses, and warranty information. The project is built with a modern technology stack including React (Frontend), Node.js with Express (Backend), MongoDB (Database), and various supporting tools for deployment and real-time updates.

## Technologies Used

- ### Frontend:

  - **React.js** (for building the user interface)
  - **Ionic** (for responsive mobile-first design)
  - **Chart.js** (for visualizing asset data through charts)
  - **React Router** (for page navigation)
  

- ### Backend:

  - **Node.js** (server-side runtime)
  - **Express.js** (backend API framework)
  - **MongoDB** (NoSQL database for storing assets data)
  - **Swagger** (API documentation)
  - **JWT** (for user authentication)
  - **Mongoose** (ODM for MongoDB)

- ### DevOps:

  - Docker (containerization)
  - GitHub Actions (CI/CD pipelines)
  - Nginx (reverse proxy and load balancer)
  - Redis (caching mechanism)
  - RabbitMQ (message broker for event-driven architecture)

### Others:

- **Google Sheets API** (used for storing form data without incurring extra costs)

# Features

### Frontend

- **Dashboard Overview**: Displays a comprehensive overview of all IT assets categorized by hardware, software, and networking components.

- <img src="https://i.imgur.com/07v7c0X.png" alt="Texto alternativo" width="500" height="auto">
- <img src="https://i.imgur.com/ksd7L3w.png" alt="Texto alternativo" width="500" height="auto">

- **Asset List**: A table with detailed information on recent assets, including their name, category, status (active/inactive), last update, and warranty status.
- <img src="https://i.imgur.com/mIvUoUY.png" alt="Texto alternativo" width="500" height="auto">

- **Real-time Charts**: Interactive doughnut and bar charts representing asset distribution by category, status, and warranty coverage.
- <img src="https://i.imgur.com/W4e1Kux.png" alt="Texto alternativo" width="500" height="auto">

- **Search Functionality**: Implements a search bar to quickly filter assets by name or category.
Responsive Design: The frontend is fully responsive, utilizing the Ionic framework to ensure it works seamlessly on both mobile and desktop devices.
- <img src="https://i.imgur.com/iOWyQth.png" alt="Texto alternativo" width="500" height="auto">

- <img src="https://i.imgur.com/w2qceTL.png" alt="Texto alternativo" width="500" height="auto">

- **Edit Assets**: Users can easily update the details of existing assets through an intuitive interface. This feature allows for modifications to asset information such as name, category, status, and warranty details. Changes are immediately reflected in the system, ensuring that asset data remains accurate and up-to-date.
- <img src="https://i.imgur.com/Uwt1qyJ.png" alt="Texto alternativo" width="500" height="auto">

## Backend

**Asset Management API**: A RESTful API to handle CRUD operations for assets (create, read, update, delete).

**User Authentication**: JWT-based authentication to secure API endpoints and manage user access.
Database Integration: MongoDB stores asset data, including categories, statuses, and warranty information.

**Swagger Documentation**: The API is documented using Swagger, providing an easy interface for developers to explore and test the endpoints.

**Caching with Redis**: Frequently accessed data is cached in Redis for improved performance.

## DevOps & Deployment

**Dockerized Application**: Both frontend and backend services are containerized using Docker for easy deployment and scalability.

**CI/CD Pipeline**: Automated testing, linting, and deployment via GitHub Actions to ensure that new changes are tested and deployed to production seamlessly.

**Reverse Proxy with Nginx**: Nginx is used as a reverse proxy to route requests to the appropriate services and balance the load effectively.

**Event-driven Architecture**: RabbitMQ is used to handle asynchronous tasks like email notifications or background jobs.

# Installation

### Prerequisites

**Node.js** (version 14.x or higher)
**MongoDB** (for local development or a cloud instance like MongoDB Atlas)
**Docker** (optional for containerized deployment)

### Frontend Setup

1. **Clone the repository**:
```
git clone https://github.com/your-username/asset-management.git
cd asset-management/frontend
```
2. **Install dependencies**:
```
npm install
```
3. **Start the development server**:
```
npm start
```

### Backend Setup

1. **Navigate to the backend directory**:
```
cd ../backend
```
2. **Install dependencies**:
```
npm install
```
3. **Create a .env file in the root of the backend directory with the following content**:
```
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
REDIS_URI=your-redis-uri
```
4. **Start the backend server**:
```
npm start
```

# API Documentation
The API is fully documented using Swagger. You can access the documentation by visiting the following URL after starting the backend server:
```
http://localhost:5000/api-docs
```

### **Example Endpoints**
GET /api/assets: Retrieve all assets in the system.
POST /api/assets: Create a new asset.
PUT /api/assets/:id: Update an asset's details.
DELETE /api/assets/:id: Delete an asset by ID.
POST /api/login: User login (returns JWT token).

##
# Data Models
### Asset Model

- **id (String)**: Unique identifier for the asset.
- **name (String)**: Name of the asset.
- **category (String)**: Category of the asset (e.g., Hardware, Software).
- **status (Boolean)**: Indicates whether the asset is active or inactive.
- **lastUpdated (Date)**: Timestamp of the last asset update.
- **warrantyStatus (Boolean)**: Indicates whether the asset is under warranty.

##
## Testing
The project includes unit tests for both the frontend and backend.

### Frontend Testing
1. **To run frontend tests, use the following command**:
```
npm run test
```
### Backend Testing
1. **To run backend tests, use**:
```
npm test
```

##
### Deployment
### Dockerized Deployment
To deploy the application using Docker, follow these steps:

1. **Build the Docker images for both frontend and backend**:
```
docker-compose build
```
2. **Start the services**:
```
docker-compose up
```
This will start both the frontend and backend services in containers. The app will be available at `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend API.

##
# Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

##
# License
This project is licensed under the MIT License - see the LICENSE file for details.

##
### Acknowledgements
- Ionic for the powerful UI components that helped create a responsive interface.
- Chart.js for providing beautiful and interactive charts.
- Swagger for easy API documentation and testing.
- MongoDB for flexible and scalable database solutions.