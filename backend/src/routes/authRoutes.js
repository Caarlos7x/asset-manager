import express from 'express';
import { loginUser } from '../controllers/authController.js';

const router = express.Router();

// Defina a rota para o login
router.post('/login', loginUser);

// Log para depuração
console.log('authRoutes carregadas');

export default router;
