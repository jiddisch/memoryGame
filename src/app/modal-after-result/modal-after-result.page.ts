import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LevelService } from '../services/level/level.service';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-modal-after-result',
  templateUrl: './modal-after-result.page.html',
  styleUrls: ['./modal-after-result.page.scss'],
})
export class ModalAfterResultPage {
  isSuccess: boolean;
  public level: number;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private levelService: LevelService,
    public adMobFree: AdMobFree) {}

  ionViewWillEnter() {
    this.levelService.level$.subscribe((res) => {
      this.level = res;
    });
    this.isSuccess = this.navParams.get('isSuccess');
    this.showBanner();
  }

  showBanner() {
    const bannerConfig: AdMobFreeBannerConfig = {
        autoShow: true,
        id: 'ca-app-pub-5654307421760048~2423783592'
    };
    this.adMobFree.banner.config(bannerConfig);
    this.adMobFree.banner.prepare();
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
