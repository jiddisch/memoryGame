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
  private interval;
  private speed: number;

  constructor(
    private winRef: WindowService,
    private router: Router,
    private levelService: LevelService,
    private speedService: SpeedService) { }

  ionViewWillEnter(): void {
    this.speedService.speed$.subscribe((res) => {
      this.speed = res;

      this.interval = setInterval(() => {
        this.play();
      }, this.speed);
    });
    this.canvasArea = {width: this.winRef.nativeWindow.innerWidth - 16 - 16, height: this.winRef.nativeWindow.innerHeight - 60};
    this.colors = ['#008000', '#ffc0cb', '#ffff00', '#0000ff', '#808080', '#ffa500', '#a52a2a', '#4b0082', '#800080', 'red'];
    this.myColors = [];
    this.orderColors = [];
    this.counter = 0;
    this._CANVAS = this.canvasEl.nativeElement;
    this._CANVAS.width = this.canvasArea.width;
    this._CANVAS.height = this.canvasArea.height;
    this.setupCanvas();
  }

  ionViewDidEnter() {
    this.levelService.level$.subscribe((res) => {
      this.level = res;
    });
  }

  setupCanvas(): void {
    this._CONTEXT = this._CANVAS.getContext('2d');
    this._CONTEXT.fillStyle = this.getRandomColor();
    this._CONTEXT.fillRect(0, 0, this.canvasArea.width, this.canvasArea.height);
    this._CONTEXT.beginPath();
  }

  play() {
    this.counter++;
    if (this.counter < this.level) {
      this.clearCanvas();
      this.setupCanvas();
    } else {
      this.clearCanvas();
      clearInterval(this.interval);
      const navigationExtras: NavigationExtras = {
        state: {myColors: this.myColors, orderColors: this.orderColors}
      };
      this.router.navigate(['/result'], navigationExtras);
    }
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
    const randomColor: string = notUsedColors[Math.floor(Math.random() * this.colors.length)];
    this.myColors.push(randomColor);
    this.orderColors.push(randomColor);
    return randomColor;
  }

}
