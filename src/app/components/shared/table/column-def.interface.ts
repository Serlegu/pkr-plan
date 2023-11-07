export interface IColumnDefinition {
  columnDef: string;
  header: string;
  cell: (element: any) => string;
}
