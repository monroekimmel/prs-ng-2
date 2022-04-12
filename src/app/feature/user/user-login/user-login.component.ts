import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  title: string = 'Welcome to PRS!';
  message: string = "";
  user: User = new User();

  constructor(private userSvc: UserService,
              private sysSvc: SystemService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.userSvc.login(this.user).subscribe(
      resp => {
        if(resp == null) {
          this.message = "Invalid username or password";
        } else {
          this.user = resp as User;
          this.sysSvc.loggedInUser = this.user;
          this.router.navigateByUrl("/home");
        }
      },
      
      err => {
        console.log("User login error.", err);
        this.message = "Error during login";
      }
    );
  }

}
