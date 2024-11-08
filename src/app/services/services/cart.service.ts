import { Injectable } from '@angular/core';
import { Productosresponse } from 'src/app/interfaces/productosresponse';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  removeFromCart(id: number) {
    this.cart = this.cart.filter(product => product.id !== id);
  }
  private cart: Productosresponse[] = [];
  constructor() { }

  addToCart(product: Productosresponse) {
    this.cart.push(product);
  }

  getCart():  Productosresponse[] {
    return this.cart;
  }
 

  clearCart() {
    this.cart = [];
  }
}
