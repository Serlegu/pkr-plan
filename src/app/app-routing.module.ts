import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'session',
    loadChildren: () =>
      import('./features/session/session.module').then((m) => m.SessionModule),
  },
  // Wildcard route for a 404 page
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
      /*enableTracing: true,*/ //-> uncomment for debugging purpose
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
