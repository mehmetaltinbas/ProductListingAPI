import express, { Request, Response } from 'express';
import productService from '../services/productService';
import { ReadAllProductsResponse } from '../responses/productResponses';

const router = express.Router();

router.get('/keepalive', async function KeepAlive(req, res) {
    const response = { isSuccess: true, message: 'kept alive' };
    res.json(response);
});

router.get('/', async function ReadAllProducts(req: Request, res: Response) {
    const result = await productService.ReadAllProductsAsync();
    res.send(result);
});

router.get(
    '/filter/pricerange',
    async function ReadAllProductsFilteredByPriceRange(req: Request, res: Response): Promise<any> {
        let min: number | undefined, max: number | undefined;
        if (!req.query.min && !req.query.max) {
            const response: ReadAllProductsResponse = {
                isSuccess: false,
                message: 'at least 1 input must be given, min or max',
            };
            return res.status(400).json(response);
        } else if (!req.query.min && req.query.max) {
            max = typeof req.query.max === 'string' ? parseFloat(req.query.max) : NaN;
            if (isNaN(max)) {
                const response: ReadAllProductsResponse = {
                    isSuccess: false,
                    message: 'input(s) must be valid numbers',
                };
                return res.status(400).json(response);
            }
        } else if (req.query.min && !req.query.max) {
            min = typeof req.query.min === 'string' ? parseFloat(req.query.min) : NaN;
            if (isNaN(min)) {
                const response: ReadAllProductsResponse = {
                    isSuccess: false,
                    message: 'input(s) must be valid numbers',
                };
                return res.status(400).json(response);
            }
        } else if (req.query.min && req.query.max) {
            min = typeof req.query.min === 'string' ? parseFloat(req.query.min) : NaN;
            max = typeof req.query.max === 'string' ? parseFloat(req.query.max) : NaN;
            if (isNaN(min) || isNaN(max)) {
                const response: ReadAllProductsResponse = {
                    isSuccess: false,
                    message: 'input(s) must be valid numbers',
                };
                return res.status(400).json(response);
            }
        }
        const result = await productService.ReadAllProductsFilteredByPriceRangeAsync(min, max);
        if (!result.isSuccess) {
            return res.status(400).send(result);
        }
        res.send(result);
    }
);

router.get(
    '/filter/popularityscore',
    async function ReadAllProductsFilteredByPopularityScore(req: Request, res: Response): Promise<any> {
        let min: number | undefined, max: number | undefined;
        if (!req.query.min && !req.query.max) {
            const response: ReadAllProductsResponse = {
                isSuccess: false,
                message: 'at least 1 input must be given, min or max',
            };
            return res.status(400).json(response);
        } else if (!req.query.min && req.query.max) {
            max = typeof req.query.max === 'string' ? parseFloat(req.query.max) : NaN;
            if (isNaN(max)) {
                const response: ReadAllProductsResponse = {
                    isSuccess: false,
                    message: 'input(s) must be valid numbers',
                };
                return res.status(400).json(response);
            }
        } else if (req.query.min && !req.query.max) {
            min = typeof req.query.min === 'string' ? parseFloat(req.query.min) : NaN;
            if (isNaN(min)) {
                const response: ReadAllProductsResponse = {
                    isSuccess: false,
                    message: 'input(s) must be valid numbers',
                };
                return res.status(400).json(response);
            }
        } else if (req.query.min && req.query.max) {
            min = typeof req.query.min === 'string' ? parseFloat(req.query.min) : NaN;
            max = typeof req.query.max === 'string' ? parseFloat(req.query.max) : NaN;
            if (isNaN(min) || isNaN(max)) {
                const response: ReadAllProductsResponse = {
                    isSuccess: false,
                    message: 'input(s) must be valid numbers',
                };
                return res.status(400).json(response);
            }
        }
        const result = await productService.ReadAllProductsFilteredByPopularityScore(min ?? undefined, max ?? undefined);
        if (!result.isSuccess) {
            return res.status(400).send(result);
        }
        res.send(result);
    }
);

export default router;
