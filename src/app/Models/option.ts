import { Product } from "./Product";

export interface Option {
    id?: number
    code?: string
    stockIn?: number
    name?: string
    itemPrice?: number
    availableOptions?: string
    productId?: number
    product:Product
  }
