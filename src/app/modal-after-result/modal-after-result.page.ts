import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LevelService } from '../services/level/level.service';

@Component({
  selector: 'app-modal-after-result',
  templateUrl: './modal-after-result.page.html',
  styleUrls: ['./modal-after-result.page.scss'],
})
export class ModalAfterResultPage {
  isSuccess: boolean;
  public level: number;

  constructor(private modalController: ModalController, private navParams: NavParams, private levelService: LevelService) {}

  ionViewWillEnter() {
    this.levelService.level$.subscribe((res) => {
      this.level = res;
    });
    this.isSuccess = this.navParams.get('isSuccess');
  }

  async closeModal(isLevelUp: boolean) {
    await this.modalController.dismiss(isLevelUp);
  }

  playAgain() {
    this.closeModal(false);
  }

  levelUp() {
    this.closeModal(true);
  }

}
