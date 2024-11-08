import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Productosresponse } from 'src/app/interfaces/productosresponse';



@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent  implements OnInit {
  @Input() product!: Productosresponse;
  @Output() remove = new EventEmitter<number>();

  onRemove() {
    this.remove.emit(this.product.id);
  }


  constructor() { }

  ngOnInit() {}

}
