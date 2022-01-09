import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCartService {
  
  public itemsInCart = new BehaviorSubject<any>(0);

  constructor( private httpClient : HttpClient ) { }

  cartUrl = 'http://localhost:3000/api/cart'

  getItemCount(){
    return this.itemsInCart.asObservable();
  }
  setItemCount(param : any){
    this.itemsInCart.next(param);
  }

  getProducts(){
    return this.httpClient.get(this.cartUrl)
  }
  addToCart(product:any){
    console.log('Adding to http cart')
    console.log(product)
    return this.httpClient.patch(this.cartUrl , product )
  }
  removeFromCart(item : any){
    console.log('Http Service')
    console.log(item)
    return this.httpClient.delete( this.cartUrl+`/${item._id}`)
  }
}
