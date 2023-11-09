import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private communicationSubject: Subject<string> = new Subject<string> ();

  performAction(action: string): void {
    this.communicationSubject.next(action);
  }

  getAction$(): Observable<string> {
    return this.communicationSubject.asObservable();
  }
}
