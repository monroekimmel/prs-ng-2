import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  title = "Product Detail";
  product: Product = null;
  productId: number = 0;
  
  constructor(private productSvc: ProductService,
              private sysSvc: SystemService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();

    this.route.params.subscribe(
      parms => {
        this.productId = parms['id'];
      });
    this.productSvc.getById(this.productId).subscribe(
      resp => {
        this.product = resp as Product;
      },
      err => {
        console.log(err);
      }
    )
  }

  delete() {
    this.productSvc.delete(this.product.id).subscribe(
      resp => {
        this.product = resp as Product;
        this.router.navigateByUrl("/product-list");
      },
      err => {
        console.log(err);
      }
    );
  }

}
