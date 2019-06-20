import { Component, ElementRef, ViewChild } from '@angular/core';
import { WindowService } from '../services/window/window.service';

interface IcanvasArea {
  width: number;
  height: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('canvas') canvasEl: ElementRef;
  private _CANVAS: any;
  private _CONTEXT: any;
  canvasArea: IcanvasArea;
  colors: string[];
  myColors: string[];
  counter: number;
  cards: number;

  constructor(private winRef: WindowService) { }

  ionViewWillEnter(): void {
    this.canvasArea = {width: this.winRef.nativeWindow.innerWidth - 16 - 16, height: this.winRef.nativeWindow.innerHeight - 16 - 16 - 56};
    this.colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300',
    '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D', '#B366CC', '#4D8000',
    '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380',
    '#FF4D4D', '#99E6E6', '#6666FF'];
    this.myColors = [];
    this.cards = 4;
    this.counter = 0;
    this._CANVAS = this.canvasEl.nativeElement;
    this._CANVAS.width = this.canvasArea.width;
    this._CANVAS.height = this.canvasArea.height;
    this.setupCanvas();
  }

  setupCanvas(): void {
    this._CONTEXT = this._CANVAS.getContext('2d');
    this._CONTEXT.fillStyle = this.getRandomColor();
    this._CONTEXT.fillRect(0, 0, this.canvasArea.width, this.canvasArea.height);
    this._CONTEXT.beginPath();
    this._CONTEXT.rect(0, 0, this.canvasArea.width, this.canvasArea.height);
  }

  play() {
    this.counter++;
    if (this.counter < this.cards) {
      this.clearCanvas();
      this.setupCanvas();
    } else {
      this.showChoosenCards();
    }
  }

  showChoosenCards() {
    this.clearCanvas();

    this._CONTEXT = this._CANVAS.getContext('2d');
    this._CONTEXT.fillStyle = this.getRandomColor();
    this._CONTEXT.fillRect(0, 0, this.canvasArea.width / 2, this.canvasArea.height / 2);
    this._CONTEXT.fillRect(this.canvasArea.width * 2, 0, this.canvasArea.width / 2, this.canvasArea.height / 2);
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
    return randomColor;
  }

}
