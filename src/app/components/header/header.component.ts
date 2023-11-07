import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'pkr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private readonly communicationService: CommunicationService) {}

  ngOnInit(): void {}

  createSession(event: string) {
    this.communicationService.performAction(event);
  }

  enterSession(event: string) {
    this.communicationService.performAction(event);
  }
}
