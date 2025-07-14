import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomerDto } from '../models/northwind-swagger/customer-dto';
import { OrderDto } from '../models/northwind-swagger/order-dto';
import { ErrorHandlerService } from './error-handler.service';

const API_ENDPOINT = 'https://data-northwind.indigo.design';

@Injectable({
  providedIn: 'root'
})
export class NorthwindSwaggerService {
  constructor(
    private http: HttpClient
  ) { }

  public getCustomerDtoList(): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(`${API_ENDPOINT}/Customers`)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto[]>('getCustomerDtoList', [])));
  }

  public getOrderDtoList(id: string): Observable<OrderDto[]> {
    if (!id) {
      return of([]);
    }
    return this.http.get<OrderDto[]>(`${API_ENDPOINT}/Customers/${id}/Orders`)
      .pipe(catchError(ErrorHandlerService.handleError<OrderDto[]>('getOrderDtoList', [])));
  }
}
