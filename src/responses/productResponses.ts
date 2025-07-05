import { Product } from "../interfaces/productInterface";
import { ResponseBase } from "./ResponseBase";

export interface GetAllProductsResponse extends ResponseBase {
    products: Product[];
}