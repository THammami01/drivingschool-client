import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AppState from '../__store__/AppState';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.isLoading$ = this.store.select('loader');
  }

  ngOnInit(): void {
    document.title = "SG d'Auto-École ⇢ Page Introuvable";
  }

  handleGoBackHome() {
    this.store.dispatch({ type: 'START_LOADING' });

    setTimeout(() => {
      this.store.dispatch({ type: 'STOP_LOADING' });

      if (localStorage.getItem('accessToken'))
        this.router.navigate(['workspace']);
      else this.router.navigate(['login']);
    }, 1000);
  }
}
