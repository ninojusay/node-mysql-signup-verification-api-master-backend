﻿require('rootpath')();  // Ensure root path resolution
const config = require('config.json');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler'); // Error handler middleware
const { sequelize } = require('./_helpers/db');  // Import the sequelize instance
const teacherRoutes = require('./routes/teacher.routes');  // Import teacher routes



// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());  // This will ensure JSON requests are parsed correctly
app.use(cookieParser());  // This handles cookies

// CORS configuration
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// API Routes
app.use('/accounts', require('./accounts/accounts.controller'));  // Accounts controller
app.use('/api/teachers', teacherRoutes);  // Register routes for Teacher CRUD operations




// Swagger documentation route
app.use('/api-docs', require('_helpers/swagger'));  // Swagger docs for the API

// Global error handler
app.use(errorHandler);

// Start the server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
