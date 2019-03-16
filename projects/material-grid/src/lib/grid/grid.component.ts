import { Component, OnInit, Input, ContentChildren, AfterContentInit, ViewChild, QueryList, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { GridDataSource } from '../grid-data-source';
import { MatColumnDef, MatTable, MatSort, MatAutocompleteSelectedEvent, MatDialog, MatChipList, MatChipEvent, MatDialogRef } from '@angular/material';
import { GridActionDirective } from './grid-action.directive';
import { GridFilterDirective } from './grid-filter.directive';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit, AfterContentInit {
  private _columns: string[] = [];
  private _filters: string[] = [];
  private _actions: string[] = [];
  private _filtersInputControl = new FormControl;
  private _filterQuery: string = null;
  private _showFilters: boolean = true;

  @Input() dataSource: GridDataSource<any>;
  @Input() title: string;
  @Input() set columns(columns: string[]) {
    this._columns = columns;
  }
  @Input() set filters(filters: string[]) {
    this._filters = filters;
  }
  @Input() set actions(actions: string[]) {
    this._actions = actions;
  }
  @Input() showAdd = false;
  @Input() showPick = false;
  @Input() showSelection = false;
  @Input() showState = false;
  @Input() set showFilters(showFilters: boolean) {
    this._showFilters = showFilters;
  }
  @Input() pageSizeOptions: number[] = [5, 10, 50];
  @Input() addLabel: string = 'action.add';

  @Output() add = new EventEmitter<any>();
  @Output() pick = new EventEmitter<any[]>();
  @Output() delete = new EventEmitter<any[]>();

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatTable) tableElement: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filterInput') filterInput: ElementRef;
  @ViewChild('filterInput', { read: MatAutocompleteTrigger }) filterInputTrigger: MatAutocompleteTrigger;
  @ViewChild('filtersChipList') filtersChipList: MatChipList;
  
  @ContentChildren(MatColumnDef) matColumnDefs: QueryList<MatColumnDef>;
  @ContentChildren(GridActionDirective) _gridActions: QueryList<GridActionDirective>;
  @ContentChildren(GridFilterDirective) _gridFilters: QueryList<GridFilterDirective>;

  constructor(
    private _dialog: MatDialog
  ) { }

  get columns() {
    const columns = this._columns.slice();

    if (this.showSelection) {
      columns.unshift('_selection');
    }

    columns.push('_actions');

    return columns;
  }

  get filters() {
    return this._filters;
  }

  get actions() {
    return this._actions;
  }

  get showFilters() {
    return this._showFilters && this.gridFilters.length > 0;
  }

  ngOnInit() {
    this._filtersInputControl
      .valueChanges
      .subscribe(query => {
        if (typeof query === 'string' && query.length) {
          this._filterQuery = query;
        } else if (!query || typeof query === 'string' && !query.length) {
          this._filterQuery = null;
        }
      });
  }

  ngAfterViewInit() {

  }

  ngAfterContentInit() {
    this.matColumnDefs.forEach(matColumnDef => {
      this.table.addColumnDef(matColumnDef);
    });
    this.dataSource.filters = this.gridFilters;
  }

  get gridFilters() {
    return this._gridFilters.filter(filter => this.filters.indexOf(filter.field) !== -1);
  }

  get gridActions() {
    return this._gridActions.filter(action => this.actions.indexOf(action.name) !== -1);
  }

  get selectionActions() {
    return this.gridActions.filter(action => !action.more);
  }

  get moreSelectionActions() {
    return this.gridActions.filter(action => action.more && action.show(this.dataSource.selection));
  }

  get dialog() {
    return this._dialog;
  }

  get filtersInputControl() {
    return this._filtersInputControl;
  }

  get filterQuery() {
    return this._filterQuery;
  }

  openFilterDialog(filter: GridFilterDirective) {
    const config = Object.assign({}, filter.dialogConfig);
    config.data = Object.assign({}, config.data, {
      value: filter.value,
      title: filter.title
    });
    const dialogRef: MatDialogRef<any> = this.dialog.open(filter.dialog, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        filter.value = result;
        this.dataSource.activateFilter(filter);
      }
    });
  }

  onFilterSelect(event: MatAutocompleteSelectedEvent) {
    if ((<GridFilterDirective>event.option.value).dialog && !this.filterQuery) {
      this.openFilterDialog((<GridFilterDirective>event.option.value));
    } else {
      (<GridFilterDirective>event.option.value).value = (<GridFilterDirective>event.option.value).toModel(this.filterQuery);
      this.dataSource.activateFilter((<GridFilterDirective>event.option.value));
    }
    this.filterInput.nativeElement.value = '';
    this.filtersInputControl.setValue(null);
  }

  onFilterRemove(event: MatChipEvent) {
    this.dataSource.deactivateFilter((<GridFilterDirective>event.chip.value));
  }

  onFilterEdit(filter: GridFilterDirective, event: MouseEvent) {
    if (!event.srcElement.classList.contains('mat-chip-remove')) {
      this.openFilterDialog(filter);
    }
  }

  onAddFilter($event) {
    $event.stopPropagation();
    this.filterInputTrigger.openPanel();
    this.filterInput.nativeElement.focus();
  }

  get actionsMargin() {
    // console.log(this.tableElement);
    return 300;
  }

  addRow() {
    this.add.next();
  }

  pickRows(rows: any[]) {
    this.pick.emit(rows);
  }

  deleteRows(rows: any[]) {
    this.delete.emit(rows);
  }

}
