import { OrderDetails } from "./order-details";

export interface Order{
  orderDate: Date
  shippedDate: Date
  status: string
  clientName?: string
  phone?: number
  address?: string
  city?: string
  price?: number
  duration?: number
  dealPrice?: number
  siteProfits?: number
  shippingProfits?: number
  marketingProfits:number
  orderDetail?:OrderDetails[]
}
