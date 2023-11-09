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

  private getSessionStorage(): ISession[] {
    return (
      this.storageService.local.getItem(this.configService.config.app?.name) ||
      {}
    );
  }

  getById(id: number): Observable<ISession> {
    const sessionsConfigFromStorage = this.getSessionStorage();
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

  updateSession(session: ISession) {
    const sessionsConfigFromStorage = this.getSessionStorage();
    const index = sessionsConfigFromStorage.findIndex(
      (sfs) => sfs.id === session.id
    );
    if (index !== -1) {
      sessionsConfigFromStorage[index] = session;
      this.storageService.local.setItem(
        this.configService.config.app?.name,
        sessionsConfigFromStorage
      );
      this.sessionUpdated(session);
    }
  }

  delete(sessionId: number) {
    const sessionsConfigFromStorage = this.getSessionStorage();
    const index = sessionsConfigFromStorage.findIndex(
      (sfs) => sfs.id === sessionId
    );
    if (index !== -1) {
      sessionsConfigFromStorage.splice(index, 1);
    this.storageService.local.setItem(
      this.configService.config.app?.name,
      sessionsConfigFromStorage
    );
      this.sessionDeleted();
    }
  }

  createUserStory(session: ISession, userStory: IUserStory) {
    if (!session.stories) {
      session.stories = [];
    }
    session.stories.push(userStory);
    this.updateSession(session);
  }

  deleteUserStory(session: ISession, userStoryId: number) {
    if (session.stories) {
      const index = session.stories.findIndex(
        (story: IUserStory) => story.id === userStoryId
      );
      if (index !== -1) {
        session.stories.splice(index, 1);
        this.updateSession(session);
      }
    }
  }

  startVotingProcess(session: ISession, userStoryId: number) {
    if (session.stories) {
      session.stories = session.stories.map((story) => {
        if (story.id === userStoryId) {
          story.status = StoryVoteStatus.VOTING;
        }
        return story;
      });
      this.updateSession(session);
    }
  }

  stopVotingProcess(session: ISession, userStoryId: number) {
    if (session.stories) {
      session.stories = session.stories.map((story: IUserStory) => {
        if (story.id === userStoryId) {
          story.status = StoryVoteStatus.VOTED;
          }
        return story;
        });
      this.updateSession(session);
    }
  }

  addMember(session: ISession, member: IMember) {
    if (!session.members) {
      session.members = [];
    }
    session.members.push({
        ...member,
        id: this.utilsService.getNextIdFromArray(session.members || []),
    });
    this.updateSession(session);
  }

  addVotes(session: ISession, storyId: number) {
    if (session.stories) {
      session.stories = session.stories.map((story: IUserStory) => {
        if (story.id === storyId) {
          story.votes = (story.votes || 0) + 1;
      }
        return story;
    });

      session.votes = (session.votes || 0) + 1;
      this.updateSession(session);
    }
  }

  sessionUpdated(session: ISession) {
    this.socketService.sendMessage('session-updated', session);
  }

  sessionDeleted() {
    this.socketService.sendMessage('session-deleted', {});
  }
}
