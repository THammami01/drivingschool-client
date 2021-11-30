import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import AppState from '../__store__/AppState';
import { MessageService } from 'primeng/api';
import AuthService from '../__services__/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  formData = {
    email: '',
    password: '',
  };

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService,
    private router: Router
  ) {
    this.clearMsgs();
    this.isLoading$ = this.store.select('loader');
    this.isLoggedIn$ = this.store.select('login');
  }

  ngOnInit(): void {
    document.title = "SG d'Auto-École ⇢ Connexion";

    if(localStorage.getItem("accessToken")) {
      this.router.navigate(['workspace']);
    }
  }

  handleLogin() {
    this.clearMsgs();

    setTimeout(() => {
      if (!this.formData.email || !this.formData.password) {
        this.showMsg('warn', 'Veuillez saisir tous les champs.');
        return;
      }

      this.store.dispatch({ type: 'START_LOADING' });
      setTimeout(() => {
        AuthService.login(this.formData)
          .then((res) => {
            if (res.data.statusCode === 200) {
              localStorage.setItem('accessToken', res.data.accessToken);
              this.store.dispatch({ type: 'SET_LOGGED_IN' });
              this.router.navigate(['workspace']);
            } else {
              this.showMsg(
                'error',
                'Adresses et/ou mot de passe sont invalides.'
              );
            }
          })
          .catch((_err) => {
            this.showMsg('error', "Une erreur s'est survenue.");
          })
          .finally(() => {
            this.store.dispatch({ type: 'STOP_LOADING' });
          });
      }, 900);
    }, 100);
  }

  clearMsgs() {
    this.messageService.clear();
  }

  showMsg(severity: string, summary: string) {
    this.clearMsgs();

    this.messageService.add({
      severity,
      summary,
      detail: '',
    });
  }
}
