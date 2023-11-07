import { StoryVoteStatus } from './story-status.enum';

export interface IUserStory {
  id: number;
  description: string;
  status: StoryVoteStatus;
  votes: number;
}
