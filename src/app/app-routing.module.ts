import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MonitorSpaceComponent } from './workspace/monitor-space/monitor-space.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'workspace', component: WorkspaceComponent },
  { path: 'monitor-space', component: MonitorSpaceComponent },
  // {
  //   path: 'workspace',
  //   component: WorkspaceComponent,
  //   children: [
  //     {
  //       path: 'monitor-space',
  //       component: MonitorSpaceComponent,
  //     },
  //   ],
  // },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
