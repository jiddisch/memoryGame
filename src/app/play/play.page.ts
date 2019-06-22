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
    this.colors = ['#ff6633', '#ffb399', '#ff33ff', '#ffff99', '#00b3b6', '#b6b333', '#3366b6', '#999966', '#99ff99', '#b34d4d', '#80b300',
    '#809900', '#b6b3b3', '#6680b3', '#66991a', '#ff99b6', '#ccff1a', '#ff1a66', '#b6331a', '#33ffcc', '#66994d', '#b366cc', '#4d8000',
    '#b33300', '#cc80cc', '#66664d', '#991aff', '#b666ff', '#4db3ff', '#1ab399', '#b666b3', '#33991a', '#cc9999', '#b3b31a', '#00b680',
    '#4d8066', '#809980', '#b6ff80', '#1aff33', '#999933', '#ff3380', '#cccc00', '#66b64d', '#4d80cc', '#9900b3', '#b64d66', '#4db380',
    '#ff4d4d', '#99b6b6', '#6666ff'];
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
