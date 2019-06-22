import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IcanvasArea } from 'src/app/interfaces';
import { WindowService } from '../services/window/window.service';
import { ModalController } from '@ionic/angular';
import { ModalAfterResultPage } from '../modal-after-result/modal-after-result.page';
import { ModalOptions, OverlayEventDetail } from '@ionic/core';
import { LevelService } from '../services/level/level.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage {
  myColors: string[];
  orderColors: string[];
  canvasArea: IcanvasArea;
  numOfClick = -1;
  isCorrect: number[];
  public level: number;
  @ViewChildren(
    'canvas1, canvas2, canvas3, canvas4, canvas5, canvas6, canvas7, canvas8, canvas9, canvas10'
  ) canvasQL: QueryList<ElementRef>;

  constructor(
    private winRef: WindowService,
    private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    private levelService: LevelService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.myColors = this.router.getCurrentNavigation().extras.state.myColors;
        this.orderColors = this.router.getCurrentNavigation().extras.state.orderColors;
      }
    });
  }

  ionViewDidEnter() {
    this.isCorrect = [];
    this.levelService.level$.subscribe((res) => {
      this.level = res;
      this.canvasArea = {
        width: this.winRef.nativeWindow.innerWidth / 2 - 16,
        height: this.winRef.nativeWindow.innerHeight / 2 - 22 - 36
      };

      this.canvasQL.toArray().forEach((element, i) => {
        if (i + 1 <= this.level) {
          const ctx = this.setupCanvas(element.nativeElement);
          this.canvasQL.toArray()[i].nativeElement.setAttribute('data-color', ctx.fillStyle);
          if (i === 0) {
            ctx.fillRect(0, 0, this.canvasArea.width, this.canvasArea.height);
          } else if (i === 1) {
            ctx.fillRect(10, 0, this.canvasArea.width, this.canvasArea.height);
          } else if (i === 2 && res > 2) {
            ctx.fillRect(0, 10, this.canvasArea.width, this.canvasArea.height);
          } else if (i === 3 && res > 3) {
            ctx.fillRect(10, 10, this.canvasArea.width, this.canvasArea.height);
          } else if (i === 4 && res > 4) {
            ctx.fillRect(0, 10, this.canvasArea.width, this.canvasArea.height);
          } else if (i === 5 && res > 5) {
            ctx.fillRect(10, 10, this.canvasArea.width, this.canvasArea.height);
          } else if (i === 6 && res > 6) {
            ctx.fillRect(0, 10, this.canvasArea.width, this.canvasArea.height);
          } else if (i === 7 && res > 7) {
            ctx.fillRect(10, 10, this.canvasArea.width, this.canvasArea.height);
          } else if (i === 8 && res > 8) {
            ctx.fillRect(0, 10, this.canvasArea.width, this.canvasArea.height);
          } else if (i === 9 && res > 9) {
            ctx.fillRect(10, 10, this.canvasArea.width, this.canvasArea.height);
          } else if (i === 10 && res > 10) {
            ctx.fillRect(0, 10, this.canvasArea.width, this.canvasArea.height);
          }
          const index = this.myColors.indexOf(ctx.fillStyle);
          this.myColors.splice(index, 1);
        }
      });
    });
    if (!this.myColors) {
      this.router.navigate(['home']);
    }
  }

  async presentModal(isSuccess: boolean) {
    const modalOptions: ModalOptions = {
      component: ModalAfterResultPage,
      componentProps: { isSuccess },
      showBackdrop: true
    };
    const modal: HTMLIonModalElement = await this.modalController.create(modalOptions);

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      this.isCorrect = [];
      this.numOfClick = -1;
      if (detail !== null) {
        if (detail.data) {
          this.levelService.setLevel(this.level = this.level + 1);
        }
      }
    });
    await modal.present();
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
      this.isCorrect.push(1);
      ctx.moveTo(widthCheckmark, height);
      ctx.lineTo(widthCheckmark + 20, height + 20);
      ctx.lineTo(widthCheckmark + 60, height - 25);
    } else {
      this.isCorrect.push(0);
      ctx.moveTo(width - 20, height - 20);
      ctx.lineTo(width + 20, height + 20);
      ctx.moveTo(width + 20, height - 20);
      ctx.lineTo(width - 20, height + 20);
      this.presentModal(false);
    }
    ctx.stroke();
    if (this.level === this.isCorrect.length) {
      if (this.isCorrect.every((r) => r === 1)) {
        this.presentModal(true);
      }
    }
  }

  getRandomColor(): string {
    return this.myColors[Math.floor(Math.random() * this.myColors.length)];
  }

}

