import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AppState from 'src/app/__store__/AppState';
import { flattenObject } from 'src/app/__utils__/funcs';
import MonitorService from 'src/app/__services__/MonitorService';
import { MessageService } from 'primeng/api';

interface Monitor {
  _id?: string;

  personalCode: String; // Code personnel
  nicNumber: String; // CIN
  lastname: String; // Nom
  firstname: String; // Prénom
  birthday: String; // Date de naissance
  address: String; // Adresse
  mobile: String; // Mobile
  personalFunction: String; // Fonction personnel
  recruitingDate: String; // Date de recrutement
  qualification: String; // Qualification
  numberOfLeaveDaysByYear: String; // Jours de congé par an
  grossSalary: String; // Salaire brut
  cnssNumber: String; // Numéro CNSS
  cnssWithholdingRate: String; // Taux de retenue CNSS
  taxesRate: String; // Taux de charge patronale
  withholdingTaxRate: String; // Taux de retenue à la source
  netBalance: String; // Salaire net
  balance: String; // Solde
  enteredBy: String; // Saisi par
  enteredAt: String; // Saisi le
}

@Component({
  selector: 'app-monitor-space',
  templateUrl: './monitor-space.component.html',
  styleUrls: ['./monitor-space.component.scss'],
  providers: [MessageService],
})
export class MonitorSpaceComponent implements OnInit {
  isLoading$: Observable<boolean>;
  monitors: Monitor[] = [
    // {
    //   _id: '1',
    //   firstname: 'Asma',
    //   lastname: 'Ben Mohamed',
    //   // photoURL: 'assets/imgs/avatar-01.png',
    // },
    // {
    //   _id: '2',
    //   firstname: 'Amani',
    //   lastname: 'Bejaoui',
    //   // photoURL: 'assets/imgs/avatar-02.png',
    // },
  ];
  filterKey = '';

  dialogMonitorId = '-1';
  dialogMonitor: Monitor = {
    _id: '-1',
    personalCode: '',
    nicNumber: '',
    lastname: '',
    firstname: '',
    birthday: '',
    address: '',
    mobile: '',
    personalFunction: '',
    recruitingDate: '',
    qualification: '',
    numberOfLeaveDaysByYear: '',
    grossSalary: '',
    cnssNumber: '',
    cnssWithholdingRate: '',
    taxesRate: '',
    withholdingTaxRate: '',
    netBalance: '',
    balance: '',
    enteredBy: '',
    enteredAt: '',
  };

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private messageService: MessageService
  ) {
    this.isLoading$ = this.store.select('loader');
  }

  ngOnInit(): void {
    document.title = "SG d'Auto-École ⇢ Espace Moniteur";

    if (!localStorage.getItem('accessToken')) this.router.navigate(['login']);

    this.fetchMonitors();
  }

  fetchMonitors() {
    MonitorService.getMonitors()
      .then((res) => {
        console.log(res.data);
        this.monitors = res.data.monitors;
      })
      .catch(() => {
        this.showStatusToast('Erreur', "Une erreur s'est survenue.");
      });
  }

  get filteredMonitors() {
    return this.monitors?.filter((monitor) => {
      return flattenObject(monitor)
        .toLowerCase()
        .includes(this.filterKey.toLowerCase());
    });
  }

  openDialog(monitorToUse: Monitor | null) {
    if (monitorToUse === null) {
      this.dialogMonitorId = '-1';
      this.dialogMonitor = {
        personalCode: '',
        nicNumber: '',
        lastname: '',
        firstname: '',
        birthday: '',
        address: '',
        mobile: '',
        personalFunction: '',
        recruitingDate: '',
        qualification: '',
        numberOfLeaveDaysByYear: '',
        grossSalary: '',
        cnssNumber: '',
        cnssWithholdingRate: '',
        taxesRate: '',
        withholdingTaxRate: '',
        netBalance: '',
        balance: '',
        enteredBy: '',
        enteredAt: '',
      };
    } else {
      this.dialogMonitorId = monitorToUse._id as string;
      this.dialogMonitor = monitorToUse;
    }

    this.showPositionDialog('center');
  }

  handleValidate() {
    this.store.dispatch({ type: 'START_LOADING' });

    setTimeout(() => {
      if (this.dialogMonitorId === '-1') {
        MonitorService.postMonitor(this.dialogMonitor)
          .then((res) => {
            this.monitors.push(res.data);
            this.showStatusToast('Succès', 'Moniteur ajouté avec succès.');
          })
          .catch(() => {
            this.showStatusToast('Erreur', "Une erreur s'est survenue.");
          })
          .finally(() => {
            this.store.dispatch({ type: 'STOP_LOADING' });
            this.isDialogDisplayed = false;
          });
      } else {
        MonitorService.putMonitor(this.dialogMonitor)
          .then(() => {
            this.showStatusToast('Succès', 'Moniteur modifié avec succès.');
          })
          .catch(() => {
            this.showStatusToast('Erreur', "Une erreur s'est survenue.");
          })
          .finally(() => {
            this.store.dispatch({ type: 'STOP_LOADING' });
            this.isDialogDisplayed = false;
          });
      }
    }, 500);
  }

  deleteMonitor(idToDelete: string) {
    this.store.dispatch({ type: 'START_LOADING' });

    setTimeout(() => {
      MonitorService.deleteMonitor(idToDelete)
        .then(() => {
          this.monitors = this.monitors.filter(({ _id }) => _id !== idToDelete);
          this.showStatusToast('Succès', 'Moniteur supprimé avec succès.');
        })
        .catch(() => {
          this.showStatusToast('Erreur', "Une erreur s'est survenue.");
        })
        .finally(() => {
          this.store.dispatch({ type: 'STOP_LOADING' });
          this.isDialogDisplayed = false;
        });
    }, 500);
  }

  handleGoBackHome() {
    this.store.dispatch({ type: 'START_LOADING' });

    setTimeout(() => {
      this.store.dispatch({ type: 'STOP_LOADING' });
      this.router.navigate(['workspace']);
    }, 1000);
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

  onBasicUpload(event: any) {
    for (let file of event.files) {
      // this.uploadedFiles.push(file);
    }
  }

  showStatusToast(summary: string, detail: string) {
    this.messageService.clear();

    setTimeout(() => {
      this.messageService.add({
        key: 'tc',
        severity: 'success',
        summary,
        detail,
      });
    }, 100);
  }

  // DIALOG SPECIFIC
  isDialogDisplayed!: boolean;
  position!: string;

  showPositionDialog(position: string) {
    this.position = position;
    this.isDialogDisplayed = true;
  }
}
