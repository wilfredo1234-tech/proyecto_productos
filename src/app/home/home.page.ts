import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { environment } from 'src/environments/environment';
import { Productosresponse } from '../interfaces/productosresponse';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public products: Productosresponse[] = [];
  public categories: string[] = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
  public selectedCategory: string = ''; // Variable para la categoría seleccionada

  constructor(private readonly httpSrv: HttpService, private readonly navCtr: NavController) {}

  async ngOnInit() {
    await this.loadProducts(); 
  }

  
  public async loadProducts() {
    const url = this.selectedCategory 
      ? `${environment.URL_BASE}products/category/${this.selectedCategory}` 
      : `${environment.URL_BASE}products`;
    this.products = await this.httpSrv.get<Productosresponse[]>(url); 
    console.log(this.products); 
  }

 
  public onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.loadProducts(); 
  }

  
  public onProductClick(id: number) {
    this.navCtr.navigateForward("details/" + id);
  }
}
