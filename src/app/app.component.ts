import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentPage = 'recipe';

  onPageChange(page: string){
    this.currentPage = page;
  }
}
