import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import AppState from '../__store__/AppState';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  providers: [MessageService],
})
export class WorkspaceComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private messageService: MessageService
  ) {
    this.isLoading$ = this.store.select('loader');
  }

  ngOnInit(): void {
    document.title = "SG d'Auto-École ⇢ Espace de Travail";

    if (!localStorage.getItem('accessToken')) this.router.navigate(['login']);
  }

  handleLogout() {
    this.store.dispatch({ type: 'START_LOADING' });

    setTimeout(() => {
      localStorage.removeItem('accessToken');
      this.store.dispatch({ type: 'SET_LOGGED_OUT' });
      this.store.dispatch({ type: 'STOP_LOADING' });
      this.router.navigate(['login']);
    }, 1000);
  }

  handleGoToMonitorPage() {
    this.store.dispatch({ type: 'START_LOADING' });

    setTimeout(() => {
      this.store.dispatch({ type: 'STOP_LOADING' });
      this.router.navigate(['monitor-space']);
    }, 1000);
  }

  showNotImplToast() {
    this.messageService.clear();

    setTimeout(() => {
      this.messageService.add({
        key: 'tc',
        severity: 'success',
        summary: 'Non implémenté',
        detail: 'Page inaccessible pour le moment.',
      });
    }, 100);
  }
}
