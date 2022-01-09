import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpCartService } from '../http-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

 cartItems : any = []
 grandTotal = 0

  constructor( private _cartService : CartService , private _httpCart : HttpCartService) { }

  RemoveFromCart(item :any ){
    console.log('Removing......')
    console.log(item)
    this._cartService.removeCartItem(item)
    this._httpCart.removeFromCart(item).subscribe( res => 
      {
        let items :any = res
        this._httpCart.setItemCount(items.length)
        this.ngOnInit()
      }
      )
  }
  ngOnInit(): void {
    this._httpCart.getProducts().subscribe( 
      res => {
      this.cartItems = res
      // this._httpCart.getItemCount().subscribe()
      this._httpCart.setItemCount(this.cartItems.length)
    })
    this.grandTotal =  this._cartService.getTotalPrice()
    // this.cartItems.forEach(( el :any) => {
    // Object.assign( el , { quantity :1 , total : el.price } )   
    // });
   
  }

}
