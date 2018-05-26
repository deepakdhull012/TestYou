export interface IPayment {
  id:string,
  email:string,
  phone:string,
  buyer_name:string,
  amount:number,
  purpose:string,
  expires_at:string,
  status:string,
  send_sms:boolean,
  send_email:boolean,
  shorturl:string,
  longurl:string,
  redirect_url:string,
  webhook:string,
  allow_repeated_payments:boolean,
  customer_id:string,
  created_at:string,
  modified_at:string,
  orderType:string,
  productId:string,
  userId:string;

}
