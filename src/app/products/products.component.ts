import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpCartService } from '../http-cart.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : any
  constructor( private _httpService : HttpService ,
    private _cartService : CartService ,private httpClient :HttpClient , 
    private httpCart : HttpCartService ) { }

  AddTOCart(product : any){
    // console.log(product);
    this.httpCart.addToCart(product).subscribe( res=>{
      console.log(res)
      let cartItems : any = res
      this.httpCart.setItemCount(cartItems.length)
    })
    this._cartService.addToCart(product) ;
    // console.log(this._cartService.cartItemList)
  }

  ngOnInit(): void {
    // this._httpService.getProducts().subscribe(res=>{
    //   this.products = res ;
    //   console.log(res)
    // })
    this.httpCart.getProducts().subscribe(
      res=>{
        let cartItems : any =  res
        this.httpCart.setItemCount(cartItems.length)
      }
    )
    this.httpClient.get('http://localhost:3000/api/products')
    .subscribe( res=> {
      console.log(res);
      this.products = res
    })
   
  }

}
