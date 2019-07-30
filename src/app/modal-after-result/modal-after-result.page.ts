import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
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
        overlap: false,
        id: 'ca-app-pub-5654307421760048/9963362268'
    };
    this.adMobFree.banner.config(bannerConfig);
    this.adMobFree.banner.prepare().catch(e => alert(e));
}

  async closeModal(isLevelUp: boolean) {
    this.adMobFree.banner.remove();
    await this.modalController.dismiss(isLevelUp);
  }

  playAgain() {
    this.closeModal(null);
  }

  levelUp(bool: boolean) {
    this.closeModal(bool);
  }

}
