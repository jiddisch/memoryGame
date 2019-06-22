import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpeedService } from '../services/speed/speed.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public speed: number;

  constructor(private router: Router, private speedService: SpeedService) { }

  ionViewDidEnter() {
    this.speedService.speed$.subscribe((res) => {
      this.speed = res;
    });
  }

  speedChanged(e: CustomEvent) {
    this.speedService.setSpeed(e.detail.value);
  }

  goToPlay() {
    this.router.navigate(['/play']);
  }

}
