export interface UserForWithdrawRequest {
    requestId:number;
    confirmed:boolean;
    fullName:string;
    userRole:string;
    money:number;
    userName:string;
    userMail:string;
    phone:string;
    walletNumber:number;
    address:string;
    totalProfits:number;
    withdrawnProfits:number;
}
