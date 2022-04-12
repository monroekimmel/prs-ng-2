import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from '../../../service/line-item.service';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent implements OnInit {
  requestTitle = "PurchaseRequest Approve/Reject";
  linesTitle = "Line Items";
  approveBtn = "Approve";
  rejectBtn = "Reject";
  request: Request = null;
  lineItems: LineItem[] = [];
  lineItem: LineItem = new LineItem();
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
      },
      err => {
        console.log(err);
      }
    )

    this.lineItemSvc.getLineItemsByRequestId(this.requestId).subscribe(
      resp => {
        this.lineItems = resp as LineItem[];
      },
      err => {
        console.log(err);
      }
    )
  }

  approve() {
    this.requestSvc.approve(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        this.router.navigateByUrl("/request-review");
      }
    )
  }

  
  reject() {
    this.requestSvc.reject(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        this.router.navigateByUrl("/request-review");
      }
    )
  }

}
