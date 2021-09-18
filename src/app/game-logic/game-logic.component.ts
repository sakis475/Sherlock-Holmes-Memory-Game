import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Cell } from '../interfaces';

@Component({
  selector: 'app-game-logic',
  templateUrl: './game-logic.component.html',
  styleUrls: ['./game-logic.component.scss'],
})
export class GameLogicComponent implements OnInit, OnChanges {
  //krataei ta zeugaria poy patithikan

  previousClickedCard: string = '-1';
  @Input() memoryBoxesSize: number; //6,12,16,

  @Output() levelFinished: EventEmitter<Object> = new EventEmitter<Object>();

  colSize: number;
  cellinfo: Cell[] = [];

  totalFlips: number;

  constructor() {}

  initGame() {
    this.colSize = this.getColSize(this.memoryBoxesSize);
    this.getRandomImages();

    console.log('initGame Has Runned');
  }

  ngOnInit() {}

  ngOnChanges() {
    this.previousClickedCard = '-1';
    this.cellinfo = [];
    this.initGame();

    console.log('ngOnChanges Has Runned');
  }

  getColSize(memoryBoxesSize: number): number {
    if (memoryBoxesSize <= 8) {
      return 6;
    } else if (memoryBoxesSize <= 12) {
      return 4;
    } else if (memoryBoxesSize <= 16) {
      return 3;
    } else if (memoryBoxesSize <= 24) {
      return 3;
    } else if (memoryBoxesSize <= 36) {
      return 2;
    }
  }

  getRandomImages() {
    //oles oi fotografies 1,2,3, .. ,16
    let randomDistinctNumbers: string[] = this.shuffle(
      Array.from(Array(19).keys()).slice(1, 19)
    ).map(String);

    //pairnei ta prwta misa tu pinaka, efoson thelume zeugaria
    let randomDistinctPairs = randomDistinctNumbers.slice(
      0,
      this.memoryBoxesSize / 2
    );

    randomDistinctPairs = randomDistinctPairs.concat(
      randomDistinctPairs.map((x) => '_' + x)
    );

    randomDistinctPairs = this.shuffle(randomDistinctPairs);

    for (let i = 0; i < this.memoryBoxesSize; i++) {
      this.cellinfo.push({
        image: randomDistinctPairs[i],
        flip: false,
        trans: false,
        numFlips: 0,
        reveal: false,
      });
    }

    console.log(this.cellinfo);
  }

  /**
   * Shuffles array in place. ES6 version
   * @param {Array} a items An array containing the items.
   */
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  penaltyFlipsCalculator(): number {
    let bestPossibleCaseWithNoLuck = this.memoryBoxesSize * 1.5;

    this.totalFlips = this.cellinfo
      .map((item) => item.numFlips)
      .reduce((prev, next) => prev + next);

    if (this.totalFlips > bestPossibleCaseWithNoLuck) {
      //penalty

      //flips of oblivion :)
      let letheFlipsPercentage =
        bestPossibleCaseWithNoLuck /
        (bestPossibleCaseWithNoLuck +
          (this.totalFlips - bestPossibleCaseWithNoLuck));
      return letheFlipsPercentage;
    }
    //no penalty
    return 1;
  }

  onClick(imageID) {
    this.cellinfo.find((cell) => cell.image === imageID).numFlips += 1;

    //patithike auto to imageID
    //an patithei meta to '_'+imageID
    //shmenei oti to vrike

    //myArray.find(x => x.id === '45').foo;

    if (this.cellinfo.map((cell) => cell.flip).filter(Boolean).length === 0) {
      this.cellinfo.find((cell) => cell.image === imageID).flip = true;
    } else if (
      this.cellinfo.map((cell) => cell.flip).filter(Boolean).length === 1
    ) {
      this.cellinfo.find((cell) => cell.image === imageID).flip = true;

      //vrethike zeugari
      if (
        imageID === '_' + this.previousClickedCard ||
        imageID === this.previousClickedCard.slice(1)
      ) {
        let imageIDWithoutUnderscore =
          imageID[0] === '_' ? imageID.slice(1) : imageID;

        console.log('imageIDWithoutUnderscore: ', imageIDWithoutUnderscore);

        setTimeout(() => {
          this.cellinfo.find(
            (cell) => cell.image === imageIDWithoutUnderscore
          ).reveal = true;

          this.cellinfo.find(
            (cell) => cell.image === '_' + imageIDWithoutUnderscore
          ).reveal = true;
        }, 1000);
      }

      //vrhke den vrhke zeugari, kane flip=false
      setTimeout(() => {
        //afairesh tu imageID apo to flip
        this.cellinfo = this.cellinfo.map((x) => {
          x.flip = false;
          return x;
        });
      }, 1000);
    }

    //teleiwse to level
    setTimeout(() => {
      if (
        this.cellinfo.map((cell) => cell.reveal).filter(Boolean).length ===
        this.cellinfo.length
      ) {
        console.log('emitter runned');

        this.levelFinished.emit({
          penaltyFlipsPercentage: this.penaltyFlipsCalculator().toString(),
          totalFlips: this.totalFlips,
        });
      }
    }, 1001);

    this.previousClickedCard = imageID;
  }
}
