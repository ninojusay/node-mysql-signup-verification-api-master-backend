const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const fs = require('fs');
const path = './swagger.yaml';

// Check if the file exists
if (!fs.existsSync(path)) {
  console.error(`Swagger file not found at ${path}`);
  process.exit(1);
}

const swaggerDocument = YAML.load(path);

// Serve Swagger UI at /api-docs route
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
