import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StoryVoteStatus } from '../../../models/story-status.enum';

@Component({
  selector: 'pkr-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() id = 0;
  @Input() description = '';
  @Input() status: StoryVoteStatus = StoryVoteStatus.PENDING;
  @Input() votes = 0;

  @Output() deleteClicked = new EventEmitter<number>();
  @Output() startVotingClicked = new EventEmitter<number>();
  @Output() stopVotingClicked = new EventEmitter<number>();
  @Output() voteEmittedClicked = new EventEmitter<number>();

  storyVoteStatus = StoryVoteStatus;

  voteEmittedButtonClicked(id: number) {
    this.votes = ++this.votes;
    this.voteEmittedClicked.emit(id);
  }
}
