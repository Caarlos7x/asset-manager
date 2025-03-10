import express from 'express';
import { 
  createAssets,
  getAllAssets,
  getAssetById,
  updateAssetById, 
  deleteAssetById 
} from '../controllers/assetController.js';
import { authenticateJWT } from '../middlewares/authenticateJWT.js';

const router = express.Router();

// Definir as rotas e associar ao controller
router.post('/', createAssets);
router.get('/', getAllAssets);
router.get('/:id', getAssetById);
router.put('/:id', authenticateJWT, updateAssetById);
router.delete('/:id', authenticateJWT, deleteAssetById);

export default router;