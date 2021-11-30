import { Component } from '@angular/core';
import { PrimeNGConfig, ConfirmationService } from 'primeng/api';
import { Store } from '@ngrx/store';
import AppState from './__store__/AppState';
// import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConfirmationService],
})
export class AppComponent {
  isLoading$: Observable<boolean>;
  address = '';
  password = '';

  constructor(
    private primengConfig: PrimeNGConfig,
    // public translate: TranslateService,
    private store: Store<AppState>
  ) {
    this.isLoading$ = this.store.select('loader');

    // translate.addLangs(['en', 'fr']);
    // translate.setDefaultLang('en');
    // this.translate.use('en');

    axios.defaults.baseURL = 'http://127.0.0.1:4000';
  }

  ngOnInit() {
    document.title = "SG d'Auto-École";

    // this.translate.setDefaultLang('fr');

    this.store.dispatch({ type: 'START_LOADING' });

    setTimeout(() => {
      this.store.dispatch({ type: 'STOP_LOADING' });
    }, 1000);

    // this.primengConfig.ripple = true;

    // setTimeout(() => {
    //   this.store.dispatch({ type: 'START_LOADING' });
    // }, 2000);
  }
}
