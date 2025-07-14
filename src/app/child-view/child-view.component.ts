import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IGX_GRID_DIRECTIVES, IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { OrderDto } from '../models/northwind-swagger/order-dto';
import { NorthwindSwaggerService } from '../services/northwind-swagger.service';

@Component({
  selector: 'app-child-view',
  imports: [IGX_GRID_DIRECTIVES, IgxButtonDirective, IgxRippleDirective, RouterLink],
  templateUrl: './child-view.component.html',
  styleUrls: ['./child-view.component.scss']
})
export class ChildViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private _customerID: string = 'ALFKI';
  @Input()
  public get customerID(): string {
    return this._customerID ?? 'ALFKI';
  }
  public set customerID(value: string) {
    this._customerID = value;
    this.northwindSwaggerOrderDto$.next();
  }
  public northwindSwaggerOrderDto: OrderDto[] = [];
  public northwindSwaggerOrderDto$: Subject<void> = new Subject<void>();

  constructor(
    private northwindSwaggerService: NorthwindSwaggerService,
  ) {}


  ngOnInit() {
    this.northwindSwaggerService.getOrderDtoList(this.customerID).pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindSwaggerOrderDto = data
    );
    this.northwindSwaggerOrderDto$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.northwindSwaggerService.getOrderDtoList(this.customerID).pipe(take(1)).subscribe(
        data => this.northwindSwaggerOrderDto = data
    )});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.northwindSwaggerOrderDto$.complete();
  }
}
