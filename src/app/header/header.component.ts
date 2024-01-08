import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataStorageService: DataStorageService) {}
  collapsed = true;
  errorSubscription = new Subscription();

  ngOnInit() {
    this.errorSubscription =
      this.dataStorageService.errorSubscription.subscribe((message) => {
        alert(message);
      });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  
  onFetchData() {
    this.dataStorageService.getStoredRecipes().subscribe();
  }
}
