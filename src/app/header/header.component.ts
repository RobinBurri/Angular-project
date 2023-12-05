import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  collapsed = true;
  @Output() pageSelected = new EventEmitter<string>();

  onSelectRecipes(){
    this.pageSelected.emit('recipe')
  }

  onSelectShopping() {
    this.pageSelected.emit('shopping')
  }
 }
