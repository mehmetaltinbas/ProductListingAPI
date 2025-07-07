import { Product } from '../interfaces/productInterface';
import { ResponseBase } from './ResponseBase';

export interface ReadAllProductsResponse extends ResponseBase {
    products?: Product[];
}
