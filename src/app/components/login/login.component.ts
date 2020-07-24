import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private userService:UserService, private router:Router) { 
    this.loginForm = new FormGroup({
      "password": new FormControl('', [Validators.required]),
      "email": new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ])
  });


  }

  ngOnInit() {
  }


  onSubmit(){
    this.userService.getLogin(this.loginForm.value)
      .subscribe((res:any) => {
          console.log(res);
          this.loginForm.reset();
          if(res.success){
            this.router.navigate(["/stock-market/stock-data/company"]);
            this.userService.auth = res.success;
          } else {
            alert(res.message);
          }
        }, err=>{
          console.log(err);
        }
      );
  }



}
