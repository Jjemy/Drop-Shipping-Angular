import { Images } from "./images";
import { Option } from "./option";

export interface Product {
    id:number;
    productName:string;
    stockIn:number;
    price:number;
    images:Images[];
    options: Option[];
}

