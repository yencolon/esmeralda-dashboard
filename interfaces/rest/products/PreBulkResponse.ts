import { PreProduct } from "./PreProduct";

export interface PreBulkResponse {
    quantityProductsLoaded: number;
    quantityProductsNotLoaded: number;
    products: PreProduct[];
}
