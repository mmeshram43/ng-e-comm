import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpCartService } from '../http-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private _cartService : CartService , 
    private httpCart : HttpCartService  ) { }

  cartItems : any = []
  public totalItems = 0

  ngOnInit(): void {
    this._cartService.getProducts()
    .subscribe( res=> {
      console.log('Inside header comp')
      this.totalItems = res.length ;
      // console.log(this.cartItems)
    })
    this.httpCart.getProducts().subscribe(
      res =>{
        this.cartItems = res
        // this.totalItems = this.cartItems.length
        this.httpCart.getItemCount().subscribe( res=> this.totalItems = res )
      }
    )
  }

}
