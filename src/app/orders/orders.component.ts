import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private or:OrderService, private route:Router, private us:UserService) { }

  list: any[]=[];
  a:any[]=[];
  push:any;
  ngOnInit() {
    console.log('hi')
    this.or.getData().subscribe(data=>{
      this.list=data
    })
    
    // this.or.orderData().subscribe(Aarray=>{
      
    //   if(Aarray['msg']==='no orders'){
    //     alert(Aarray['msg']);
    //   }
    //   //if user are existed interpolate that array
    //   else if(Aarray['msg']== Aarray){

    //     this.list=Aarray['msg'];
    //   }
    // console.log(this.list)
    // });
    
  }
  edit(e) {
    console.log('i am in editing');
  
  
  }
  
  
    delete(a) {
      console.log('i am in deleting');
      this.or.deleteData(a).subscribe(data => {
        alert(data['msg']);
        if (data['msg'] === ('deleted successfuly')) {
          return this.route.navigate(['navbar/orders']);
          }
       
      });
  
    }

    addneworder(l){
      console.log(l);
      this.a.push(l)
      console.log(this.a);

      this.or.newOrder(this.a).subscribe(b=>{
        this.route.navigate(['navbar/orders'])
        alert(b['msg']);
        if (b['msg']===('order added successfully')) {
  
            return this.route.navigate(['navbar/orders'])
        }
  
    
    });
     // this.push.push(l);
     // return this.route.navigate(['navbar/orders']);

    }

}
