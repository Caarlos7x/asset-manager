import express from 'express';
import { 
  createAssets,
  getAllAssets,
  getAssetById,
  updateAssetById, 
  deleteAssetById 
} from '../controllers/assetController.js';

const router = express.Router();

// Definir as rotas e associar ao controller
router.post('/', createAssets);
router.get('/', getAllAssets);
router.get('/:id', getAssetById);
router.put('/:id', updateAssetById);
router.delete('/:id', deleteAssetById);

export default router;