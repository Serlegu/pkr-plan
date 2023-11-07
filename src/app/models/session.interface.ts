import { IMember } from './member.interface';
import { IUserStory } from './user-story.interface';

export interface ISession {
  id: number;
  title: string;
  deckType?: string;
  stories?: Array<IUserStory>;
  votes?: number;
  members?: Array<IMember>;
}
