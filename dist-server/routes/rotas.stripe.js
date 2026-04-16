import { Router } from 'express';
import { criarSessaoConexao } from '../controllers/controlador.stripe.js';
const router = Router();
// Route to create a Stripe Connect session
router.post('/connect', criarSessaoConexao);
export default router;
