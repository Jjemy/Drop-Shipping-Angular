export class SupplierOrder {
    constructor(public orderId?:number, public orderDate?:Date, public productId?:number, public productName?:string,
        public quantity?:number, public totalOptionPrice?:number, public status?:string){}
}
