import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from '../../../service/line-item.service';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {
  requestTitle = "PurchaseRequest Detail";
  linesTitle = "Line Items";
  request: Request = null;
  lineItems: LineItem[] = [];
  lineItem: LineItem = new LineItem();
  isHidden = false;
  isDisabled = false;
  requestId = 0;

  constructor(private lineItemSvc: LineItemService,
              private requestSvc: RequestService,
              private sysSvc: SystemService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();

    this.route.params.subscribe(
      parms => {
        this.requestId = parms['id'];
      });

    this.requestSvc.getById(this.requestId).subscribe(
      resp => {
        this.request = resp as Request;

        if(this.request.status === "Review") {
          this.isDisabled = true;
        } else {
          this.isDisabled = false;
        }
      },
      err => {
        console.log(err);
      }
    )

    this.lineItemSvc.getLineItemsByRequestId(this.requestId).subscribe(
      resp => {
        this.lineItems = resp as LineItem[];
        if(this.lineItems.length === 0) {
          this.isHidden = true;
        }
      },
      err => {
        console.log(err);
      }
    )

  }

  delete(lineItemId: number) {
    this.lineItemSvc.delete(lineItemId).subscribe(
      resp => {
        this.lineItem = resp as LineItem;
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  submit() {
    this.requestSvc.submit(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        this.router.navigateByUrl("/request-list");
      },
      err => {
        console.log(err);
      }
    );
  }

}
