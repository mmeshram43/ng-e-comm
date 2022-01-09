import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  productsUrl = 'http://localhost:3000/api/products/'
  constructor( private _httpClient : HttpClient ) { }
  getProducts(){
    return this._httpClient.get(this.productsUrl)
  }
}
