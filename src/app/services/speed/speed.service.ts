import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeedService {
  private speed: BehaviorSubject<number> = new BehaviorSubject(1000);

  get speed$() {
    return this.speed.asObservable();
  }

  setSpeed(speed: number) {
    this.speed.next(speed);
  }
}
