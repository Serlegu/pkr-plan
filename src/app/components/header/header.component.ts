import { Component, OnInit, inject } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { IMenuItem } from 'src/app/models/menu-item.interface';

@Component({
  selector: 'pkr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private readonly communicationService = inject(CommunicationService);
  menuItems: IMenuItem[] = [];

  ngOnInit(): void {
    this.initializeMenuItems();
  }

  initializeMenuItems() {
    this.menuItems = [
      {
        icon: 'login',
        literal: 'Create Session',
        clickAction: (action) => this.performAction(action),
      },
    ];
  }

  performAction(event: string) {
    this.communicationService.performAction(event);
  }
}
