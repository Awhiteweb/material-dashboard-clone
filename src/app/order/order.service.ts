import { BehaviorSubject } from "rxjs";
import { IOrder } from "./order";

export class OrderService {
  private _orderListSubject$: BehaviorSubject<IOrder[]> = new BehaviorSubject<
    IOrder[]
  >([]);

  get subscribeToOrderList$(): Obervable<IOrder[]> {
    return this._orderListSubject$.asObservable();
  }

  retreiveOrderList(startIndex: string) {
    this._orderListSubject$.next([
      {
        id: "123",
        name: "abc"
        address: 'abc',
        qty: 1,
        status: "paid"
      },
      {
        id: "456",
        name: "eee"
        address: 'ddd',
        qty: 1,
        status: "pending_payment"
      },
      {
        id: "789",
        name: "rtg"
        address: 'fff',
        qty: 2,
        status: "completed"
      }
    ]);
  }
}
