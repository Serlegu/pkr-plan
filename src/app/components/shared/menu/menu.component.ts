import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IMenuItem } from 'src/app/models/menu-item.interface';

/**
 * @title Menu with icons
 */
@Component({
  selector: 'pkr-menu',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: 'menu.component.html',
})
export class MenuComponent {
  @Input() items: IMenuItem[] = [];

  @Output() public itemMenuClicked: EventEmitter<string> = new EventEmitter();

  createSessionButtonClicked(action: string) {
    this.itemMenuClicked.emit(action);
  }
}
