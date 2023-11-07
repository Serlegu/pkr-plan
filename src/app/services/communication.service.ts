import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private communicationSubject: ReplaySubject<string> =
    new ReplaySubject<string>(1);

  performAction(action: string): void {
    this.communicationSubject.next(action);
  }

  getAction$(): Observable<string> {
    return this.communicationSubject.asObservable();
  }
}
