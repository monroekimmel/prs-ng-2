import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { SystemService } from 'src/app/service/system.service';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title = "Product List";
  products: Product[] = [];
  isNotAdmin = false;

  constructor(private productSvc: ProductService,
              private sysSvc : SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();

    if(!(this.sysSvc.loggedInUser.admin)) {
      this.isNotAdmin = true;
    }

    this.productSvc.getAll().subscribe(
      resp => {
        this.products = resp as Product[];
      },
      err => {
        console.log(err);
      }
    )
  }

}
