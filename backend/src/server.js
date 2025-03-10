import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import assetRoutes from './routes/assetRoutes.js';
import authRoutes from './routes/authRoutes.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// Carregar a documentação Swagger
const swaggerDocument = YAML.load('./swagger.yaml');

dotenv.config();
console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/assets', assetRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API Up and Running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;