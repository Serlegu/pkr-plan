import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISession } from '../models/session.interface';
import { IUserStory } from '../models/user-story.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class UserStoryService {
  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpClient
  ) {}

  getById(id: Number): Observable<IUserStory> {
    return this.http.get<IUserStory>(
      `${this.configService.config.baseUrl}/sessions/${id}/stories`
    );
  }

  create(session: ISession, userStory: IUserStory) {
    session.stories = [...(session.stories || []), userStory];
    //  session.stories?.push(userStory);
    return this.http.get(
      `${this.configService.config.baseUrl}/sessions/${session.id}?_embed=session.stories`
    );
  }

  delete(session: ISession, userStoryId: number) {
    const userStories = session.stories?.filter((us) => us.id !== userStoryId);
    session.stories = userStories;

    return this.http.get(
      `${this.configService.config.baseUrl}/sessions/${session.id}?_embed=session.stories`
    );
  }
}
