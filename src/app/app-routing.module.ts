import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: () =>
      import('./thegame/thegame.module').then((m) => m.ThegamePageModule),
    pathMatch: 'full',
  },
  {
    path: 'login-or-register',
    loadChildren: () =>
      import('./login-or-register/login-or-register.module').then(
        (m) => m.LoginOrRegisterPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
