import { Option } from "./option";

export interface ProductOptionCart {
  id:number;
  quantity:number;
  option:Option;
  cartId:number;
  optionId:number;
  newPrice:number;

}

