import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productosresponse } from 'src/app/interfaces/productosresponse';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment.prod';
import { ToastController, NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/services/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public products!: Productosresponse; // Cambiado a un solo producto
  private id!: number;

  constructor(
    private readonly httpSrv: HttpService,
    private readonly params: ActivatedRoute,
    private readonly cartService: CartService,
    private readonly toastController: ToastController,
    private readonly navCtrl: NavController // Se añade NavController
  ) {}

  async ngOnInit() {
    this.params.params.subscribe(async (params) => {
      const url = environment.URL_BASE + 'products/' + params['id'];
      console.log(params);
      this.products = await this.httpSrv.get<Productosresponse>(url);
      console.log(url);
    });
  }

  async addToCart() {
    this.cartService.addToCart(this.products);
    const toast = await this.toastController.create({
      message: 'Producto agregado al carrito.',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  async payForProduct() {
    const toast = await this.toastController.create({
      message: 'Pago exitoso ' + this.products.title,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  // Método para navegar al carrito
  goToCart() {
    this.navCtrl.navigateForward('/cart');
  }
}
