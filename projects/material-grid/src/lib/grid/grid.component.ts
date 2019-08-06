import { Component, OnInit, Input, ContentChildren, AfterContentInit, ViewChild, QueryList, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { GridDataSource } from '../grid-data-source';
import { MatColumnDef, MatTable, MatSort, MatAutocompleteSelectedEvent, MatChipList, MatChipEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material';
import { GridActionDefDirective, Strategy } from './grid-action-def.directive';
import { GridFilterDefDirective } from './grid-filter-def.directive';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit, AfterContentInit {
  private _columns: string[] = [];
  private _visibleFilterNames: string[] = [];
  private _visbleActionNames: string[] = [];
  private _filtersInputControl = new FormControl;
  private _filterQuery: string = null;
  private _showFilters: boolean = true;
  private _hoveredRowIndex: number = null;
  private _isRowMenuOpened: boolean = false;

  @Input() dataSource: GridDataSource<any>;
  @Input() title: string;
  @Input() set columns(columns: string[]) {
    this._columns = columns;
  }

  @Input('filters')
  get visibleFilterNames() {
    return this._visibleFilterNames;
  }
  set visibleFilterNames(filters: string[]) {
    this._visibleFilterNames = filters;
  }
  @Input('actions')
  get visbleActionNames() {
    return this._visbleActionNames;
  }
  set visbleActionNames(actions: string[]) {
    this._visbleActionNames = actions;
  }

  @Input() showSelection = false;
  @Input() showState = false;
  @Input() set showFilters(showFilters: boolean) {
    this._showFilters = showFilters;
  }
  @Input() pageSizeOptions: number[] = [5, 10, 50];
  @Input() selectionLabel: string = 'Selected';
  @Input() moreLabel: string = 'Show more actions';
  @Input() refreshLabel: string = 'Refresh';
  @Input() addFilterLabel: string = 'Add filter';
  @Input() emptyResultLabel: string = 'No records found';
  @Input() minCellWidth: number = 200;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatTable, { static: true }) tableElement: ElementRef;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filterInput', { static: false }) filterInput: ElementRef;
  @ViewChild('filterInput', { read: MatAutocompleteTrigger, static: false }) filterInputTrigger: MatAutocompleteTrigger;
  @ViewChild('filtersChipList', { static: true }) filtersChipList: MatChipList;
  
  @ContentChildren(MatColumnDef) matColumnDefs: QueryList<MatColumnDef>;
  @ContentChildren(GridActionDefDirective) _gridActionDefs: QueryList<GridActionDefDirective>;
  @ContentChildren(GridFilterDefDirective) _gridFilterDefs: QueryList<GridFilterDefDirective>;

  get columns() {
    const columns = this._columns.slice();

    if (this.showSelection) {
      columns.unshift('_selection');
    }

    columns.push('_actions');

    return columns;
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
    return this
      .visibleFilterNames
      .map(filterField => this._gridFilterDefs.find(filter => filter.field === filterField))
      .filter(filter => filter !== undefined)
    ;
  }

  get allActions() {
    return this
      .visbleActionNames
      .map(actionName => this._gridActionDefs.find(action =>  action.name === actionName))
      .filter(action => action !== undefined)
    ;
  }

  getGridActions() {
    return this.allActions.filter(action => (action.strategy === Strategy.GRID) && (action.shouldShow()));
  }

  getRowActions(rows: any[]) {
    return this.allActions.filter(action => (action.strategy === Strategy.ROW) && (action.shouldShow(rows)));
  }

  getMoreRowActions(rows: any[]) {
    return this.allActions.filter(action => (action.strategy === Strategy.MORE) && (action.shouldShow(rows)));
  }

  get filtersInputControl() {
    return this._filtersInputControl;
  }

  get filterQuery() {
    return this._filterQuery;
  }

  openFilterDialog(filter: GridFilterDefDirective) {
    const dialog = filter.openDialog();
    if (dialog) {
      dialog.subscribe(value => {
        if (value) {
          filter.value = value;
          this.dataSource.activateFilter(filter);
        }
        this.filterInput.nativeElement.blur();
        this.filterInputTrigger.closePanel();
      });
    }
  }

  onFilterSelect(event: MatAutocompleteSelectedEvent) {
    const filter: GridFilterDefDirective = event.option.value;
    
    if (filter.dialog && !this.filterQuery) {
      this.openFilterDialog(filter);
    } else {
      filter.value = filter.convertToModelValue(this.filterQuery);
      this.dataSource.activateFilter(filter);
    }
    
    this.filterInput.nativeElement.value = '';
    this.filterInput.nativeElement.blur();
    this.filtersInputControl.setValue(null);
  }

  onFilterRemove(event: MatChipEvent) {
    const filter: GridFilterDefDirective = event.chip.value;
    this.dataSource.deactivateFilter(filter);
  }

  onFilterEdit(filter: GridFilterDefDirective) {
    this.openFilterDialog(filter);
  }

  onAddFilter($event) {
    $event.stopPropagation();
    this.filterInputTrigger.openPanel();
    this.filterInput.nativeElement.focus();
  }

  get actionsMargin() {
    return 300;
  }

  setHoveredRow(index: number|null) {
    if (!this._isRowMenuOpened) {
      this._hoveredRowIndex = index;
    }
  }

  isRowHovered(index: number) {
    return this._hoveredRowIndex === index;
  }

  setRowMenuOpenState(state: boolean) {
    this._isRowMenuOpened = state;
  }

  get minRowWidth() {
    return (this.columns.length - 1 - (this.showSelection ? 1 : 0)) * this.minCellWidth + (this.showSelection ? 72 : 0);
  }


  get activeFilters(): GridFilterDefDirective[] {
    return this
      .dataSource
      .filters
      .filter(filter => filter.isActive)
    ;
}

  get availableFilters(): GridFilterDefDirective[] {
    return this
      .dataSource
      .filters
      .filter(filter => !filter.isActive && filter.shouldSupport(this.filterQuery))
    ;
  }
}
