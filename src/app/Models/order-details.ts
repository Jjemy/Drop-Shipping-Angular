import { Option } from './option';

export interface OrderDetails {
  id: number
  quantity: number
  totalOptionPrice: number
  orderId: number
  option?:Option[]
}
