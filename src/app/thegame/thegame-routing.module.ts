import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameLogicComponent } from '../game-logic/game-logic.component';

import { ThegamePage } from './thegame.page';

const routes: Routes = [
  {
    path: '',
    component: ThegamePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThegamePageRoutingModule {}
