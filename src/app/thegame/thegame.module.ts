import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThegamePageRoutingModule } from './thegame-routing.module';

import { ThegamePage } from './thegame.page';
import { GameLogicComponent } from '../game-logic/game-logic.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ThegamePageRoutingModule],
  declarations: [ThegamePage, GameLogicComponent],
})
export class ThegamePageModule {}
