import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IcanvasArea } from 'src/app/interfaces';
import { WindowService } from '../services/window/window.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements AfterViewInit {
  myColors: string[];
  orderColors: string[];
  canvasArea: IcanvasArea;
  numOfClick = -1;
  @ViewChildren('canvas1, canvas2, canvas3, canvas4') canvasQL: QueryList<ElementRef>;

  constructor(private winRef: WindowService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.myColors = this.router.getCurrentNavigation().extras.state.myColors;
        this.orderColors = this.router.getCurrentNavigation().extras.state.orderColors;
      }
    });
  }

  ngAfterViewInit() {
    this.canvasArea = {
      width: this.winRef.nativeWindow.innerWidth / 2 - 16,
      height: this.winRef.nativeWindow.innerHeight / 2 - 22 - 36
    };
    this.canvasQL.toArray().forEach((element, i) => {
      const ctx = this.setupCanvas(element.nativeElement);
      this.canvasQL.toArray()[i].nativeElement.setAttribute('data-color', ctx.fillStyle);
      if (i === 0) {
        ctx.fillRect(0, 0, this.canvasArea.width, this.canvasArea.height);
      } else if (i === 1) {
        ctx.fillRect(10, 0, this.canvasArea.width, this.canvasArea.height);
      } else if (i === 2) {
        ctx.fillRect(0, 10, this.canvasArea.width, this.canvasArea.height);
      } else if (i === 3) {
        ctx.fillRect(10, 10, this.canvasArea.width, this.canvasArea.height);
      }
      const index = this.myColors.indexOf(ctx.fillStyle);
      this.myColors.splice(index, 1);
    });
  }

  setupCanvas(elm: any) {
    const canvas = elm;
    canvas.width = this.canvasArea.width;
    canvas.height = this.canvasArea.height;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = this.getRandomColor();

    return ctx;
  }

  checkAnswer(i: number) {
    this.numOfClick++;
    const widthCheckmark = this.canvasQL.toArray()[i].nativeElement.width / 2 - 20;
    const width = this.canvasQL.toArray()[i].nativeElement.width / 2;
    const height = this.canvasQL.toArray()[i].nativeElement.height / 2;
    const ctx = this.canvasQL.toArray()[i].nativeElement.getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#fff';
    if (this.orderColors[this.numOfClick] === this.canvasQL.toArray()[i].nativeElement.getAttribute('data-color')) {
      ctx.moveTo(widthCheckmark, height);
      ctx.lineTo(widthCheckmark + 20, height + 20);
      ctx.lineTo(widthCheckmark + 60, height - 25);
    } else {
      ctx.moveTo(width - 20, height - 20);
      ctx.lineTo(width + 20, height + 20);
      ctx.moveTo(width + 20, height - 20);
      ctx.lineTo(width - 20, height + 20);
    }
    ctx.stroke();
  }

  playAgain() {
    this.router.navigate(['play']);
  }

  getRandomColor(): string {
    return this.myColors[Math.floor(Math.random() * this.myColors.length)];
  }

}

