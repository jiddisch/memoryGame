import { Component, ElementRef, ViewChild } from '@angular/core';
import { WindowService } from '../services/window/window.service';
import { Router, NavigationExtras } from '@angular/router';
import { IcanvasArea } from 'src/app/interfaces';
import { LevelService } from '../services/level/level.service';
import { SpeedService } from '../services/speed/speed.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage {

  @ViewChild('canvas') canvasEl: ElementRef;
  private _CANVAS: any;
  private _CONTEXT: any;
  canvasArea: IcanvasArea;
  colors: string[];
  myColors: string[];
  orderColors: string[];
  counter: number;
  public level: number;
  private speed: number;

  constructor(
    private winRef: WindowService,
    private router: Router,
    private levelService: LevelService,
    private speedService: SpeedService) { }

  ionViewDidEnter(): void {
    this.counter = 0;
    this.canvasArea = {width: this.winRef.nativeWindow.innerWidth - 16 - 16, height: this.winRef.nativeWindow.innerHeight - 60};
    this.colors = ['#008000', '#ffc0cb', '#ffff00', '#0000ff', '#808080', '#ffa500', '#a52a2a', '#4b0082', '#800080', '#ff0000'];
    this.myColors = [];
    this.orderColors = [];
    this._CANVAS = this.canvasEl.nativeElement;
    this._CANVAS.width = this.canvasArea.width;
    this._CANVAS.height = this.canvasArea.height;
    this.levelService.level$.subscribe((res) => {
      this.level = res;
    });
    this.speedService.speed$.subscribe((res) => {
      this.speed = res;
      this.draw();
    });
  }

  draw() {
    this.counter++;
    if (this.counter <= this.level) {
      if (this._CONTEXT) {
        this.clearCanvas();
      }
      this.setupCanvas();
      this.play();
    } else {
      this.clearCanvas();
      const navigationExtras: NavigationExtras = {
        state: {myColors: this.myColors, orderColors: this.orderColors}
      };
      this.router.navigate(['/result'], navigationExtras);
    }
  }

  play() {
    setTimeout(() => {
      this.draw();
    }, this.speed);
  }

  setupCanvas(): void {
    this._CONTEXT = this._CANVAS.getContext('2d');
    this._CONTEXT.fillStyle = this.getRandomColor();
    this._CONTEXT.fillRect(0, 0, this.canvasArea.width, this.canvasArea.height);
    this._CONTEXT.beginPath();
  }

  clearCanvas(): void {
    this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
  }

  getRandomColor(): string {
    const notUsedColors = this.colors.filter((color) => {
      return !this.myColors.find((c) => {
        return c === color;
      });
    });
    const randomColor: string = notUsedColors[Math.floor(Math.random() * notUsedColors.length)];
    this.myColors.push(randomColor);
    this.orderColors.push(randomColor);
    return randomColor;
  }

}
