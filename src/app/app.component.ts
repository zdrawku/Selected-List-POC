import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGX_LIST_DIRECTIVES, IgxAvatarComponent, IgxIconComponent } from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { CustomerDto } from './models/northwind-swagger/customer-dto';
import { NorthwindSwaggerService } from './services/northwind-swagger.service';

@Component({
  selector: 'app-root',
  imports: [IGX_LIST_DIRECTIVES, IgxAvatarComponent, IgxIconComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public selectedCustomer?: string;
  public northwindSwaggerCustomerDto: CustomerDto[] = [];

  constructor(
    private northwindSwaggerService: NorthwindSwaggerService,
    private router: Router,
  ) {}


  ngOnInit() {
    this.northwindSwaggerService.getCustomerDtoList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindSwaggerCustomerDto = data
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public clickListItem(item: CustomerDto): void {
    this.selectedCustomer = item?.customerId;
    this.router.navigate([`/child-view/${item.customerId}`]);
  }
}
