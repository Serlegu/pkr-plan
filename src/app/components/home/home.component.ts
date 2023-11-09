import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, filter, switchMap, takeUntil } from 'rxjs';
import { CommunicationService } from '../../services/communication.service';
import { ConfigService } from '../../services/config.service';
import { SessionService } from '../../services/session.service';
import { CreateSessionDialogComponent } from '../create-session-dialog/create-session-dialog.component';
import { IDeckType } from 'src/app/models/deck-type.interface';

@Component({
  selector: 'pkr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  receivedData: string;
  deckTypes: IDeckType[] = [];
  private readonly notifier$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private configService: ConfigService,
    private communicationService: CommunicationService,
    private readonly sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.initialzeDeckTypesData();
    this.getAction();
  }

  private getAction() {
    this.communicationService
      .getAction$()
      .pipe(takeUntil(this.notifier$))
      .subscribe((data) => {
        switch (data) {
          case 'createSession':
            this.createSession();
            break;
        }
      });
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  initialzeDeckTypesData() {
    this.deckTypes = [
      { description: 'standard', id: 0 },
      { description: 'custom', id: 1 },
      { description: 'spanish', id: 2 },
    ];
  }

  manageAction(actionType: string) {
    switch (actionType) {
      case 'create':
        this.createSession();
        break;
    }
  }

  createSession() {
    const sessionDialogData = {
      data: this.deckTypes,
      ...this.configService.config.app.modalConfig,
    };
    const dialogRef = this.dialog.open(
      CreateSessionDialogComponent,
      sessionDialogData
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
