import products from '../data/products.json';
import axios from 'axios';
import { Product } from '../interfaces/productInterface';
import { GetAllProductsResponse } from '../responses/productResponses';

const ReadAllProductsAsync = async function () : Promise<GetAllProductsResponse> {
    const products = await getProductsAsync();
    return { isSuccess: true, message: 'All products read!', products: products };
};

// const ReadAllProductsFilteredByPriceRangeAsync = async function () : Promise<GetAllProductsResponse> {
//     const products = await getProductsAsync();
//     return {};
// };

// const ReadAllProductsFilteredByPopularityScore = async function () : Promise<GetAllProductsResponse> {
//     const products = await getProductsAsync();
//     return {};
// };

const getProductsAsync = async function () : Promise<Product[]> {
    const goldPricePerGramUSD = await getGoldPricePerGramUSDAsync();
    products.forEach((product: Product) => {
    product.price = (product.popularityScore + 1) * product.weight * goldPricePerGramUSD;
    });
    return products;
};

const getGoldPricePerGramUSDAsync = async function () : Promise<number> {
    const response = await axios.get('https://www.goldapi.io/api/XAU/USD', {
        headers: {
            'x-access-token': process.env.GOLDAPI_API_KEY,
            'Content-Type': 'application/json',
        },
    });
    return response.data.price_gram_24k;
};

export default {
    ReadAllProductsAsync,
    // ReadAllProductsFilteredByPriceRangeAsync,
    // ReadAllProductsFilteredByPopularityScore
};
