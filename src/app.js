const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const { swaggerSpec } = require('./docs/swagger');
const planRoutes = require('./routes/planRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const progressRoutes = require('./routes/progressRoutes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Planner API online',
    docs: '/api-docs'
  });
});

app.use('/api/plans', planRoutes);
app.use('/api/plans', subjectRoutes);
app.use('/api/plans', progressRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
