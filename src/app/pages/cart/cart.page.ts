import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Productosresponse } from 'src/app/interfaces/productosresponse';
import { CartService } from 'src/app/services/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public cartItems: Productosresponse[] = [];

  constructor(
    private readonly cartService: CartService,
    private readonly toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  // Cargar los productos del carrito
  loadCartItems() {
    this.cartItems = this.cartService.getCart();
  }

  // Eliminar un producto específico del carrito
  async onRemoveItem(id: number) {
    this.cartService.removeFromCart(id);
    this.loadCartItems(); // Actualizar la lista de productos

    // Mostrar el toast de confirmación de eliminación
    const toast = await this.toastController.create({
      message: 'Producto eliminado del carrito.',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }

  // Simular el pago y limpiar el carrito
  async onPay() {
    // Verificar si hay productos en el carrito
    if (this.cartItems.length === 0) {
      const toast = await this.toastController.create({
        message: 'El carrito está vacío. Agrega productos antes de pagar.',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });
      await toast.present();
      return;
    }

    // Simular pago exitoso
    const paymentToast = await this.toastController.create({
      message: 'Pago realizado con éxito.',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await paymentToast.present();

    // Limpiar el carrito
    this.cartService.clearCart();
    this.loadCartItems(); 
  }
}