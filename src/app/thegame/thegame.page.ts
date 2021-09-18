import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ObjectUnsubscribedError, timer } from 'rxjs';

@Component({
  selector: 'app-thegame',
  templateUrl: './thegame.page.html',
  styleUrls: ['./thegame.page.scss'],
})
export class ThegamePage implements OnInit {
  memoryBoxesSizeOfLevel: number;

  countdownTimer: string;
  obsTimer: Observable<number> = timer(1000, 1000);
  watchVar;
  totalTimeRemaining: number;

  level: number;
  levelTime: number = 15;
  showScore: Boolean = false;
  score: number = 0;

  totalFlips: number;

  endGameScore: number = 0;
  gameFinished: boolean = false;

  constructor() {}

  timeManager(x: number) {
    //make it countdown
    x = this.levelTime - x;

    if (x == 0) {
      console.log('time is over, no points..');

      this.watchVar.unsubscribe();
    }
    this.totalTimeRemaining = x;
    this.countdownTimer = this.convertSecToTime(x);
  }

  ngOnInit() {
    this.level = 0;
    this.memoryBoxesSizeOfLevel = 4;
    console.log('ngOnInit of thegame runned');

    this.watchVar = this.obsTimer.subscribe((x) => {
      this.timeManager(x);
    });
  }

  calculateScore(passedEvent) {
    let score = 0;

    this.totalFlips = passedEvent.totalFlips;

    //no penalty, give bonus score!
    if (passedEvent.penaltyFlipsPercentage == 1) {
      score = 50;
    }

    score += Math.floor(
      this.totalTimeRemaining * 10 * passedEvent.penaltyFlipsPercentage
    );

    this.score = score;

    this.endGameScore += score;

    console.log('remainingTIme', this.totalTimeRemaining);
    console.log('penalty', passedEvent.penaltyFlipsPercentage);
  }

  onClick() {
    this.showScore = false;
    this.watchVar = this.obsTimer.subscribe((x) => {
      this.timeManager(x);
    });
  }

  //is triggered by emitter
  changeLevel($event) {
    this.watchVar.unsubscribe();

    setTimeout(() => {
      this.calculateScore($event);
      this.showScore = true;

      this.level += 1;
      if (this.level === 1) {
        this.levelTime = 30;
        this.memoryBoxesSizeOfLevel = 6;
      } else if (this.level === 2) {
        this.levelTime = 45;
        this.memoryBoxesSizeOfLevel = 8;
      } else if (this.level === 3) {
        this.levelTime = 75;
        this.memoryBoxesSizeOfLevel = 12;
      } else if (this.level === 4) {
        this.levelTime = 60 * 3;
        this.memoryBoxesSizeOfLevel = 16;
      } else if (this.level === 5) {
        this.levelTime = 60 * 4;
        this.memoryBoxesSizeOfLevel = 24;
      } else if (this.level === 6) {
        this.levelTime = 60 * 5;
        this.memoryBoxesSizeOfLevel = 36;
      } else {
        //game finished
        this.levelTime = 0;
        this.gameFinished = true;
        this.memoryBoxesSizeOfLevel = 0;
      }
    }, 250);
  }

  convertSecToTime(totalSecs: number) {
    let mins = Math.floor(totalSecs / 60).toString();
    let secs = Math.floor(totalSecs % 60).toString();

    mins = parseInt(mins) < 10 ? '0' + mins : mins;
    secs = parseInt(secs) < 10 ? '0' + secs : secs;

    return `${mins}:${secs}`;
  }
}
