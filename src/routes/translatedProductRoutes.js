import express from 'express';
import { getProductTranslated } from '../controllers/productController.js';

const router = express.Router();

router.get('/translated/:id', getProductTranslated); // New route

export default router;
