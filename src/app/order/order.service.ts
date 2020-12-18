import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Api } from "app/api/api";
import { AdminLayoutModule } from "app/layouts/admin-layout/admin-layout.module";
import { Observable, BehaviorSubject } from "rxjs";
import { IOrder, IOrderListFilter, IOrderListResponse } from "./order";

@Injectable({
  providedIn: AdminLayoutModule
})
export class OrderService {
  private _orderListSubject$: BehaviorSubject<IOrder[]> = new BehaviorSubject<IOrder[]>([]);
  private _nextIndex$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private _filters: IOrderListFilter = {
    pageCount: 10,
    search: null,
    sort: 'created_on',
    sort_desc: true
  };

  constructor(private api: Api) {}

  get subscribeToOrderList$(): Observable<IOrder[]> {
    return this._orderListSubject$.asObservable();
  }

  get subscribeToNextIndex$(): Observable<string> {
    return this._nextIndex$.asObservable();
  }

  retreiveOrderList(startIndex?: string) {
    const baseRoute = "/api/orders";
    const route = startIndex ? `${baseRoute}/${startIndex}` : baseRoute;

    this.api.get<IOrderListResponse>(route, this.filtersAsHttpParams()).subscribe((response) => {
      this._nextIndex$.next(response.nextIndex);
      this._orderListSubject$.next(response.orders);
    })

    this._orderListSubject$.next([
      {
        id: "123",
        name: "abc",
        address: 'abc',
        qty: 1,
        status: "paid"
      },
      {
        id: "456",
        name: "eee",
        address: 'ddd',
        qty: 1,
        status: "pending_payment"
      },
      {
        id: "789",
        name: "rtg",
        address: 'fff',
        qty: 2,
        status: "completed"
      }
    ]);
  }

  private filtersAsHttpParams() {
    const params = new HttpParams()
      .set("pageCount", `${this._filters.pageCount}`)
      .set("sort", this._filters.sort)
      .set("sort", `${this._filters.sort_desc ? 1 : 0}`);
    if(this._filters.search) {
      return params.set("search", this._filters.search);
    }
    return params;
  }
}
