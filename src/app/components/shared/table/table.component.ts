import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { IColumnDefinition } from './column-def.interface';

@Component({
  selector: 'pkr-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() columns: Array<IColumnDefinition> = [];
  @Input() data: Array<any> = [];

  displayedColumns = this.columns.map((c) => c.columnDef);
  dataSource = this.data;
}
