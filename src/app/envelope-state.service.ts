import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvelopeStateService {
  private pointsSubject = new BehaviorSubject<{ x: number, y: number }[]>([]);
  points$ = this.pointsSubject.asObservable();

  addPoint(point: { x: number, y: number }): void {
    const points = this.pointsSubject.getValue();
    points.push(point);
    this.pointsSubject.next(points);
  }

  updatePoints(points: { x: number, y: number }[]): void {
    this.pointsSubject.next(points);
  }
}
