import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}
  collapsed = true;
  isAuthenticated = false;
  private errorSubscription!: Subscription;
  private authSubscription!: Subscription;

  ngOnInit() {
    this.errorSubscription =
      this.dataStorageService.errorSubscription.subscribe((message) => {
        alert(message);
      });

      this.authSubscription = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;
      })
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  
  onFetchData() {
    this.dataStorageService.getStoredRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}
