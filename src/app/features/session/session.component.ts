import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit, numberAttribute } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, filter, of, pipe, switchMap, takeUntil } from 'rxjs';
import { ISession } from '../../models/session.interface';
import { StoryVoteStatus } from '../../models/story-status.enum';
import { ConfigService } from '../../services/config.service';
import { ModalInfoService } from '../../services/modal-info.service';
import { SessionService } from '../../services/session.service';
import { SocketService } from '../../services/socket.service';
import { CreateUserStoryDialogComponent } from './components/create-user-story-dialog/create-user-story-dialog.component';
import { EnterSessionDialogComponent } from './components/enter-session-dialog/enter-session-dialog.component';

@Component({
  selector: 'pkr-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  @Input({ transform: numberAttribute }) id = 0;

  current = {} as ISession;
  memberToBeAdded = null;

  private readonly notifier$ = new Subject<void>();

  constructor(
    private clipboard: Clipboard,
    private configService: ConfigService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private readonly sessionService: SessionService,
    private readonly modalInfoService: ModalInfoService,
    private readonly socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.getSessionUpdatedMessage();

    this.getSessionDeletedMessage();

    this.route.queryParamMap
      .pipe(
        switchMap((queryParam: ParamMap) => {
          if (queryParam.get('il')) {
            return this.dialog
              .open(
                EnterSessionDialogComponent,
                this.configService.config.app.modalConfig
              )
              .afterClosed()
              .pipe(
                switchMap((newSessionMember) => {
                  if (newSessionMember) {
                    this.memberToBeAdded = newSessionMember;
                    return of(this.memberToBeAdded);
                  }
                  return of('not entered');
                }),
                switchMap((response) => {
                  if (response !== 'not entered') {
                    return this.sessionService.getById(this.id);
                  }
                  return of('not entered');
                })
              );
          } else {
            return this.sessionService.getById(this.id);
          }
        }),
        takeUntil(this.notifier$)
      )
      .subscribe((result) => {
        if (result === 'not entered') {
          this.goToHomePage();
        }
        this.current = result as ISession;

        if (this.memberToBeAdded) {
          this.sessionService.addMember(this.current, this.memberToBeAdded);
          this.memberToBeAdded = null;
        }
      });
  }

  private getSessionUpdatedMessage() {
    this.socketService
      .getMessage$('session-updated')
      .pipe(takeUntil(this.notifier$))
      .subscribe(
        (session: ISession) =>
          (this.current = JSON.parse(JSON.stringify(session)))
      );
  }

  private getSessionDeletedMessage() {
    this.socketService
      .getMessage$('session-deleted')
      .pipe(
        switchMap(() => {
          return this.modalInfoService
            .open({
              title: 'Session closed',
              msg: 'I am afraid somebody destroyed the current session... ask the administrator to create a new one',
              cancelDisplayed: false,
            })
            .afterClosed()
            .pipe(
              filter((accept) => accept),
              switchMap(() => of('session deleted'))
            );
        }),
        takeUntil(this.notifier$)
      )
      .subscribe((result) => {
        if (result === 'session deleted') {
          this.goToHomePage();
        }
      });
  }

  createUserStory() {
    const dialogRef = this.dialog.open(CreateUserStoryDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(
        filter((accept) => accept),
        takeUntil(this.notifier$)
      )
      .subscribe((userStory) => {
        this.sessionService.createUserStory(this.current, {
          status: StoryVoteStatus.PENDING,
          votes: 0,
          ...userStory,
        });
      });
  }

  deleteUserStory(id: number) {
    this.sessionService.deleteUserStory(this.current, id);
  }

  startVotingProcess(id: number) {
    this.sessionService.startVotingProcess(this.current, id);
  }

  stopVotingClicked(id: number) {
    this.sessionService.stopVotingProcess(this.current, id);
  }

  voteEmittedClicked(storyId: number) {
    this.sessionService.addVotes(this.current, storyId);
  }

  trackById(_: number, item: any): string {
    return item.id;
  }

  copySessionLink() {
    this.clipboard.copy(`${window.location.href}?il=true`);
  }

  destroySession() {
    const dialogRef = this.modalInfoService.open({
      title: 'Destroy Session',
      msg: 'You are about to destroy the session... are you sure?',
      cancelDisplayed: true,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.notifier$))
      .subscribe((ok) => {
        /* istanbul ignore else*/
        if (ok) {
          this.sessionService.delete(this.current.id);
          this.goToHomePage();
        }
      });
  }

  private goToHomePage() {
    this.router.navigate(['/']);
  }
}
