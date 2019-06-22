import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private level: BehaviorSubject<number> = new BehaviorSubject(2);

  get level$() {
    return this.level.asObservable();
  }

  setLevel(level: number) {
    this.level.next(level);
  }
}
