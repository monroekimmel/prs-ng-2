import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { Product } from 'src/app/model/product.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent implements OnInit {
  title = "PurchaseRequest Line Item Edit";
  submitBtnTitle = "Save";
  lineItemId = 0;
  lineItem: LineItem = null;
  products: Product[] = [];

  constructor(private lineItemSvc: LineItemService,
            private productSvc: ProductService,
            private sysSvc: SystemService,
            private route: ActivatedRoute,
            private router: Router) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();

    this.route.params.subscribe(
      parms => { this.lineItemId = parms['id']});
    
    this.lineItemSvc.getById(this.lineItemId).subscribe(
      resp => {
        this.lineItem = resp as LineItem;
      },
      err => {
        console.log(err);
      }
    );

    this.productSvc.getAll().subscribe(
      resp => {
        this.products = resp as Product[];
      },
      err => {
        console.log(err);
      }
    );
  }

  save() {
    this.lineItemSvc.update(this.lineItem).subscribe(
      resp => {
        this.lineItem = resp as LineItem;
        this.router.navigateByUrl("/request-lines/"+this.lineItem.request.id);
      },
      err => {
        console.log(err);
      }
    )
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }

}
