import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, filter, switchMap, takeUntil } from 'rxjs';
import { CommunicationService } from '../../services/communication.service';
import { ConfigService } from '../../services/config.service';
import { SessionService } from '../../services/session.service';
import { CreateSessionDialogComponent } from '../create-session-dialog/create-session-dialog.component';

@Component({
  selector: 'pkr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  receivedData: string;
  private readonly notifier$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private configService: ConfigService,
    private communicationService: CommunicationService,
    private readonly sessionService: SessionService
  ) {}

  ngOnInit(): void {
    // this.wsService
    //   .getMessage$()
    //   .subscribe((message) =>
    //     console.warn('receiving message from ws: ', message)
    //   );

    this.communicationService
      .getAction$()
      .pipe(takeUntil(this.notifier$))
      .subscribe((data) => {
        this.createSession();
      });
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  manageAction(actionType: string) {
    switch (actionType) {
      case 'create':
        this.createSession();
        break;
    }
  }

  createSession() {
    const dialogRef = this.dialog.open(
      CreateSessionDialogComponent,
      this.configService.config.app.modalConfig
    );

    dialogRef
      .afterClosed()
      .pipe(
        filter((accept) => accept),
        switchMap((session) => {
          return this.sessionService.create({ id: 0, ...session });
        })
      )
      .subscribe((newSessionId) => {
        this.router.navigate([`/session/${newSessionId}`]);
      });
  }
}
