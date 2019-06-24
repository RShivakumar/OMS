import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private route:Router,private dc:UserService) { }

  ngOnInit() {
  }
  submit(v){
    console.log(v)
    this.dc.Data(v).subscribe(data=>{
      if(data['msg']=='you have logged in successfully')
      {
        alert(data['msg'])
        this.route.navigate(['/navbar/orders'])
      
      }
      else if(data['msg']=='invalid user name'){
          alert(data['msg'])
      }
      else if(data['msg']=='invalid password'){
        alert(data['msg'])
      }
    })
  }

}
