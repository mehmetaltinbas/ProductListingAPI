import axios from 'axios';
import products from '../data/products.json';
// import products from '../data/mockProducts.json';
import { Product } from '../interfaces/productInterface';
import { ReadAllProductsResponse } from '../responses/productResponses';

const ReadAllProductsAsync = async function (): Promise<ReadAllProductsResponse> {
    const products = await getProductsAsync();
    return { isSuccess: true, message: 'All products read!', products: products };
};

const ReadAllProductsFilteredByPriceRangeAsync = async function (min: number | undefined, max: number | undefined) : Promise<ReadAllProductsResponse> {
    const products = await getProductsAsync();
    let filteredProducts;
    if (min && max) {
        filteredProducts = products.filter((product) => (product.price ?? 0) >= min && (product.price ?? 0) <= max);
        return { isSuccess: true, message: `All products with price between min ${min} and max ${max} read!`, products: filteredProducts };
    } else if (min && !max) {
        filteredProducts = products.filter((product) => (product.price ?? 0) >= min);
        return { isSuccess: true, message: `All products with price min ${min} read!`, products: filteredProducts };
    } else if (!min && max) {
        filteredProducts = products.filter((product) => (product.price ?? 0) <= max);
        return { isSuccess: true, message: `All products with price max ${max} read!`, products: filteredProducts };
    }
    return { isSuccess: false, message: 'unexpected error' };
};

const ReadAllProductsFilteredByPopularityScore = async function (min: number | undefined, max: number | undefined) : Promise<ReadAllProductsResponse> {
    const products = await getProductsAsync();
    let filteredProducts;
    if (min && max) {
        filteredProducts = products.filter((product) => product.popularityScore >= min && product.popularityScore <= max);
        return { isSuccess: true, message: `All products with popularity score between min ${min} and max ${max} read!`, products: filteredProducts };
    } else if (min && !max) {
        filteredProducts = products.filter((product) => product.popularityScore >= min);
        return { isSuccess: true, message: `All products with popularity score min ${min} read!`, products: filteredProducts };
    } else if (!min && max) {
        filteredProducts = products.filter((product) => product.popularityScore <= max);
        return { isSuccess: true, message: `All products with popularity score max ${max} read!`, products: filteredProducts };
    }
    return { isSuccess: false, message: 'unexpected error' };
};

const getProductsAsync = async function (): Promise<Product[]> {
    const goldPricePerGramUSD = await getGoldPricePerGramUSDAsync();
    products.forEach((product: Product) => {
        product.price = Number(((product.popularityScore + 1) * product.weight * goldPricePerGramUSD).toFixed(2));
    });
    return products;
};

const getGoldPricePerGramUSDAsync = async function (): Promise<number> {
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
    ReadAllProductsFilteredByPriceRangeAsync,
    ReadAllProductsFilteredByPopularityScore
};
