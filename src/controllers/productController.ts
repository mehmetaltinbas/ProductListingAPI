import express from 'express';
import productService from '../services/productService';

const router = express.Router();

router.get('/', async function ReadAllProducts(req, res) {
    const result = await productService.ReadAllProductsAsync();
    res.send(result);
});

router.get('filter/pricerange', async function ReadAllProductsFilteredByPriceRange(req, res) {

});

router.get('filter/popularityscore', async function ReadAllProductsFilteredByPopularityScore(req, res) {

});

export default router;
