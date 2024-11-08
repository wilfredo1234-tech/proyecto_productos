import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() image: string = '';
  @Input() category: string = '';
  
  @Output() doClick = new EventEmitter<number>();

  constructor() {}

  onClick(id: number) {
    this.doClick.emit(this.id);
  }
}
