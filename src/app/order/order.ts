export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "ready_for_delivery"
  | "completed";

export interface IOrder {
  id: string;
  address: string;
  name: string;
  qty: number;
  status: OrderStatus;
}

export interface IOrderListResponse {
  orders: IOrder[];
  nextIndex: string;
}

export interface IOrderListFilter {
  sort: string;
  sort_desc: boolean;
  pageCount: number;
  search: string;
}