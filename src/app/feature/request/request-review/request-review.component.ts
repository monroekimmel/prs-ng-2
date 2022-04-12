import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { SystemService } from 'src/app/service/system.service';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  title = "PurchaseRequest Review";
  requests: Request[] = [];
  sortCriteria: string = "id";
  sortOrder: string = "asc";
  colClasses = "btn btn-link font-weight-bold";

  constructor(private requestSvc: RequestService,
              private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
  
    this.requestSvc.review(this.sysSvc.loggedInUser.id).subscribe(
      resp => {
        this.requests = resp as Request[];
      },
      err => {
        console.log(err);
      }
    )
  }

  sortBy(column: string): void {
    if(column == this.sortCriteria){
      this.sortOrder = (this.sortOrder == "desc") ? "asc" : "desc";
    }
    this.sortCriteria = column;
  }

}