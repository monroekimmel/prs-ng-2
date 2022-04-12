import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { Vendor } from 'src/app/model/vendor.class';
import { ProductService } from 'src/app/service/product.service';
import { VendorService } from 'src/app/service/vendor.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title = "Product Edit";
  submitBtnTitle = "Save";
  productId: number = 0;
  product: Product = null;
  vendors: Vendor[] = [];
  
  constructor(private productSvc: ProductService,
              private vendorSvc: VendorService,
              private sysSvc: SystemService,
              private route: ActivatedRoute,
              private router: Router,
              private loc: Location) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();

    this.route.params.subscribe(
      parms => { this.productId = parms['id']; });
    
    this.productSvc.getById(this.productId).subscribe(
      resp => {
        this.product = resp as Product;
      },
      err => {
        console.log(err);
      }
    );
    
    this.vendorSvc.getAll().subscribe(
      resp => {
        this.vendors = resp as Vendor[];
      },
      err => {
        console.log(err);
      }
    );
  }

  save() {
    this.productSvc.update(this.product).subscribe(
      resp => {
        this.product = resp as Product;
        this.router.navigateByUrl("/product-list");
      },
      err => {
        console.log(err);
      }
    )
  }

  backClicked() {
    this.loc.back();
  }

  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }

}
