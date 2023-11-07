import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

/**
 * @title Menu with icons
 */
@Component({
  selector: 'pkr-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: 'menu.component.html',
})
export class MenuComponent {
  @Output() public createSessionClicked: EventEmitter<void> =
    new EventEmitter();

  @Output() public enterSessionClicked: EventEmitter<void> = new EventEmitter();

  createSessionButtonClicked() {
    this.createSessionClicked.emit();
  }

  enterSessionButtonClicked() {
    this.createSessionClicked.emit();
  }
}
