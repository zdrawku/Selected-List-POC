import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { ChildViewComponent } from './child-view/child-view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'child-view', pathMatch: 'full' },
  { path: 'error', component: UncaughtErrorComponent },
  { path: 'child-view', component: ChildViewComponent, data: { text: 'Child-View' } },
  { path: 'child-view/:customerID', component: ChildViewComponent, data: { text: 'Child-View' } },
  { path: '**', component: PageNotFoundComponent } // must always be last
];
