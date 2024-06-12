import { Router } from 'express';
import { addProduct, updateProduct, deleteProduct, getAllProducts } from '../services/adminService.js';
import { addCampaign } from '../services/campaignService.js';
import { authenticateToken } from '../middleware/authToken.js';
import { isAdmin } from '../middleware/isAdmin.js';

const adminRouter = Router();

// POST /admin/product - Lägg till en ny produkt i menyn
adminRouter.post('/product', authenticateToken, isAdmin, addProduct);

// PUT /admin/product - Modifiera en produkt i menyn
adminRouter.put('/product', authenticateToken, isAdmin, updateProduct);

// DELETE /admin/product/:id - Ta bort en produkt i menyn
adminRouter.delete('/product/:id', authenticateToken, isAdmin, deleteProduct);

// GET /admin/products - Hämta alla produkter i menyn
adminRouter.get('/products', authenticateToken, isAdmin, getAllProducts);

// POST /admin/campaign - Lägg till ett kampanjerbjudande
adminRouter.post('/campaign', authenticateToken, isAdmin, addCampaign);

export default adminRouter;
