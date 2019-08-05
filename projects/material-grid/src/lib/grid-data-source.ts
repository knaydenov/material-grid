import { DataSource, SelectionModel } from "@angular/cdk/collections";
import { Sort, PageEvent } from "@angular/material";
import { GridFilterDefDirective } from "./grid/grid-filter-def.directive";

export abstract class GridDataSource<T> extends DataSource<T> {
    private _filters: GridFilterDefDirective[] = [];
    private _selectionModel: SelectionModel<any> = new SelectionModel<T>(true, [], true);

    abstract get isLoading(): boolean;
    abstract get items(): T[];
    abstract activateFilter(filter: GridFilterDefDirective);
    abstract deactivateFilter(filter: GridFilterDefDirective);
    abstract handleSortEvent(event: Sort);
    abstract handlePageEvent(event: PageEvent);
    abstract get limit(): number;
    abstract get total(): number;
    abstract get pageIndex(): number;
    abstract refresh(): void;

    get selectionModel() {
        return this._selectionModel;
    }

    get selection() {
        return this.selectionModel.selected;
    }

    isItemSelected(item) {
        return this.selectionModel.isSelected(item);
    }

    toggleSelection(item) {
        this.selectionModel.toggle(item);
    }

    get isAllSelected() {
        return this.items.every(item => this.selectionModel.isSelected(item));
    }

    get isNoneSelected() {
        return this.selectionModel.isEmpty();
    }

    get isPartiallySelected() {
        return this.selectionModel.hasValue() && !this.isAllSelected;
    }

    get hasSelection() {
        return this.selectionModel.hasValue();
    }

    selectAll() {
        this.items.forEach(item => this.selectionModel.select(item));
    }

    selectNone() {
        this.selectionModel.clear();
    }

    get filters(): GridFilterDefDirective[] {
        return this._filters;
    }

    set filters(filters: GridFilterDefDirective[]) {
        this._filters = filters;
    }
}
