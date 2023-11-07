import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IMember } from '../models/member.interface';
import { ISession } from '../models/session.interface';
import { StoryVoteStatus } from '../models/story-status.enum';
import { IUserStory } from '../models/user-story.interface';
import { ConfigService } from './config.service';
import { SocketService } from './socket.service';
import { StorageService } from './storage.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    private readonly configService: ConfigService,
    private readonly storageService: StorageService,
    private readonly utilsService: UtilsService,
    private readonly socketService: SocketService
  ) {}

  maxId = 0;

  getById(id: Number): Observable<ISession> {
    const sessionsConfigFromStorage: ISession[] =
      this.storageService.local.getItem(this.configService.config.app?.name);

    const session = sessionsConfigFromStorage.find(
      (session) => session.id === id
    ) as ISession;

    return of(session);
  }

  create(session: ISession): Observable<number> {
    let sessionsMerge = {};

    const sessionsConfigFromStorage: ISession[] =
      this.storageService.local.getItem(this.configService.config.app?.name);

    const newSessionId = sessionsConfigFromStorage?.length
      ? this.utilsService.getNextIdFromArray(sessionsConfigFromStorage)
      : 0;

    if (sessionsConfigFromStorage) {
      sessionsMerge = [
        { ...session, id: newSessionId },
        ...sessionsConfigFromStorage,
      ];
    } else {
      sessionsMerge = [{ ...session, id: newSessionId }];
    }

    this.storageService.local.setItem(
      this.configService.config.app?.name,
      sessionsMerge
    );
    return of(newSessionId);
  }

  delete(sessionId: number) {
    const sessionsConfigFromStorage: ISession[] =
      this.storageService.local.getItem(this.configService.config.app?.name);

    const currentSessionIndex = sessionsConfigFromStorage.findIndex(
      (sfs) => sfs.id === sessionId
    );

    if (currentSessionIndex !== -1) {
      sessionsConfigFromStorage.splice(currentSessionIndex, 1);
    }

    this.storageService.local.setItem(
      this.configService.config.app?.name,
      sessionsConfigFromStorage
    );

    this.socketService.sendMessage(
      'session-updated',
      sessionsConfigFromStorage
    );
  }

  createUserStory(session: ISession, userStory: IUserStory) {
    const sessionsConfigFromStorage: ISession[] =
      this.storageService.local.getItem(this.configService.config.app?.name);

    session.stories = [...(session.stories || []), userStory];

    const currentSessionIndex = sessionsConfigFromStorage.findIndex(
      (sfs) => sfs.id === session.id
    );

    if (currentSessionIndex !== -1) {
      sessionsConfigFromStorage[currentSessionIndex] = session;
    } else {
      sessionsConfigFromStorage.push(session);
    }
    // }

    this.storageService.local.setItem(
      this.configService.config.app?.name,
      sessionsConfigFromStorage
    );

    this.socketService.sendMessage('session-updated', session);
  }

  deleteUserStory(session: ISession, userStoryId: number) {
    const sessionsConfigFromStorage: ISession[] =
      this.storageService.local.getItem(this.configService.config.app?.name);

    const currentSessionIndex = sessionsConfigFromStorage.findIndex(
      (sfs) => sfs.id === session.id
    );

    if (
      sessionsConfigFromStorage[currentSessionIndex] &&
      sessionsConfigFromStorage[currentSessionIndex].stories?.length
    ) {
      session.stories = session.stories?.filter(
        (sessionUserStory) => sessionUserStory.id !== userStoryId
      );
      sessionsConfigFromStorage[currentSessionIndex].stories =
        sessionsConfigFromStorage[currentSessionIndex].stories?.filter(
          (sus) => sus.id !== userStoryId
        );
      this.storageService.local.setItem(
        this.configService.config.app?.name,
        sessionsConfigFromStorage
      );
    }

    this.socketService.sendMessage('session-updated', session);
  }

  startVotingProcess(session: ISession, userStoryId: number) {
    const sessionsConfigFromStorage: ISession[] =
      this.storageService.local.getItem(this.configService.config.app?.name);

    const currentSessionIndex = sessionsConfigFromStorage.findIndex(
      (sfs) => sfs.id === session.id
    );

    if (
      sessionsConfigFromStorage[currentSessionIndex] &&
      sessionsConfigFromStorage[currentSessionIndex].stories?.length
    ) {
      session.stories = session.stories?.map((sus) => {
        if (sus.id === userStoryId) {
          sus.status = StoryVoteStatus.VOTING;
        }
        return sus;
      });

      sessionsConfigFromStorage[currentSessionIndex].stories =
        sessionsConfigFromStorage[currentSessionIndex].stories?.map((sus) => {
          if (sus.id === userStoryId) {
            sus.status = StoryVoteStatus.VOTING;
          }
          return sus;
        });

      this.storageService.local.setItem(
        this.configService.config.app?.name,
        sessionsConfigFromStorage
      );

      this.sessionUpdated(session);
    }
  }

  stopVotingProcess(session: ISession, userStoryId: number) {
    const sessionsConfigFromStorage: ISession[] =
      this.storageService.local.getItem(this.configService.config.app?.name);

    const currentSessionIndex = sessionsConfigFromStorage.findIndex(
      (sfs) => sfs.id === session.id
    );

    if (
      sessionsConfigFromStorage[currentSessionIndex] &&
      sessionsConfigFromStorage[currentSessionIndex].stories?.length
    ) {
      session.stories = session.stories?.map((sus) => {
        if (sus.id === userStoryId) {
          sus.status = StoryVoteStatus.VOTED;
        }
        return sus;
      });

      sessionsConfigFromStorage[currentSessionIndex].stories =
        sessionsConfigFromStorage[currentSessionIndex].stories?.map((sus) => {
          if (sus.id === userStoryId) {
            sus.status = StoryVoteStatus.VOTED;
          }
          return sus;
        });

      this.storageService.local.setItem(
        this.configService.config.app?.name,
        sessionsConfigFromStorage
      );

      this.sessionUpdated(session);
    }
  }

  addMember(session: ISession, member: IMember) {
    const sessionsConfigFromStorage: ISession[] =
      this.storageService.local.getItem(this.configService.config.app?.name);

    const currentSessionIndex = sessionsConfigFromStorage.findIndex(
      (sfs) => sfs.id === session.id
    );

    session.members = [
      ...(session.members || []),
      {
        ...member,
        id: this.utilsService.getNextIdFromArray(session.members || []),
      },
    ];

    if (currentSessionIndex !== -1) {
      sessionsConfigFromStorage[currentSessionIndex] = session;
    } else {
      sessionsConfigFromStorage.push(session);
    }

    this.storageService.local.setItem(
      this.configService.config.app?.name,
      sessionsConfigFromStorage
    );
  }

  addVotes(session: ISession, storyId: number) {
    const sessionsConfigFromStorage: ISession[] =
      this.storageService.local.getItem(this.configService.config.app?.name);

    const currentSessionIndex = sessionsConfigFromStorage.findIndex(
      (sfs) => sfs.id === session.id
    );

    session.stories = session.stories?.map((sus) => {
      if (sus.id === storyId) {
        sus.votes = ++sus.votes;
      }
      return sus;
    });

    session.votes = session.votes ? ++session.votes : 1;

    sessionsConfigFromStorage[currentSessionIndex].stories =
      sessionsConfigFromStorage[currentSessionIndex].stories?.map((sus) => {
        if (sus.id === storyId) {
          sus.votes = ++sus.votes;
        }
        return sus;
      });

    this.storageService.local.setItem(
      this.configService.config.app?.name,
      sessionsConfigFromStorage
    );

    this.sessionUpdated(session);
  }

  sessionUpdated(session: ISession) {
    this.socketService.sendMessage('session-updated', session);
  }
}
