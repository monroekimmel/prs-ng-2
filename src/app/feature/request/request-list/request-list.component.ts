import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  title = "Purchase Request List";
  requests: Request[] = [];
  sortCriteria: string = "id";
  sortOrder: string = "asc";
  colClasses = "btn btn-link font-weight-bold";


  constructor(private requestSvc: RequestService,
              private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    
    this.requestSvc.getAll().subscribe(
      resp => {
        this.requests = resp as Request[];

        if(!(this.sysSvc.loggedInUser.admin) && !(this.sysSvc.loggedInUser.reviewer)) { 
          for(let i = this.requests.length - 1; i >= 0; --i) {
            if(this.requests[i].user.id != this.sysSvc.loggedInUser.id) {
              this.requests.splice(i, 1);
            }
          }
        }
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
