import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { parse } from 'path';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartUrl ='http://localhost:3000/api/cart/'

  public cartItemList : any = []
  public productList = new BehaviorSubject<any>([]);

  // subscribe to get the data
  getProducts(){
    return this.productList.asObservable();
  }

  // cartItems will be in 
  setProduct( product : any ){
    this.cartItemList.push(...product)
    this.productList.next(product)
  }

  addToCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList)
    this.getTotalPrice()
    
  }

  getTotalPrice(){
    let grandTotal = 0 ;
    this.cartItemList.map( (el :any) => 
      grandTotal+= el.price )
      return grandTotal
    }

    removeCartItem( product : any ){
      console.log('Removing....',product.title)
     
     this.cartItemList.map( (a :any , index : any)=>{
       if(product.id == a.id ){
         this.cartItemList.splice(index,1)
       }
     })

     this.productList.next(this.cartItemList)

    }
    removeAll(){
      this.cartItemList = []
      this.productList.next( this.cartItemList )
    }



  constructor( private httpClient : HttpClient) { }
}
