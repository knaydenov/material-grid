import { GridDataSource, GridFilterDirective } from 'material-grid';
import { Sort, PageEvent } from "@angular/material";
import { Observable, BehaviorSubject } from 'rxjs';

export interface IPeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

export interface ISimpleFilter {
    field: string;
    value: string;
}

const DATA: IPeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

export class SimpleDataSource extends GridDataSource<IPeriodicElement> {
    private _data = new BehaviorSubject<IPeriodicElement[]>(DATA);
    private _page: number = 1;
    private _activeFilters: ISimpleFilter[];

    get isLoading(): boolean {
        return false;
    }

    get items(): IPeriodicElement[] {
        return this._data.value;
    }

    get limit(): number {
        return 5;
    }

    get total(): number {
        return this._data.value.length;
    }

    get pageIndex(): number {
        return this._page;
    }

    activateFilter(filter: GridFilterDirective) {
        this._activeFilters.push({
            field: filter.key,
            value: filter.toModel(filter.value)
        });
    }

    deactivateFilter(filter: GridFilterDirective) {
        this._activeFilters = this._activeFilters.filter(_filter => _filter.field !== filter.field).slice();
    }

    handleSortEvent(event: Sort) {
        // switch (event.direction) {
        //     case 'asc':
        //         this.pageableResource.sort = [{field: event.active, direction: true}];
        //         break;
        //     case 'desc':
        //     this.pageableResource.sort = [{field: event.active, direction: false}];
        //         break;
        //     case '':
        //     default:
        //     this.pageableResource.sort = [];
        //         break;
        // }
        // this.pageableResource.commit();
    }

    handlePageEvent(event: PageEvent) {
        this._page = event.pageIndex + 1;
    }

    refresh(): void {
        // this.pageableResource.refresh();
    }

    connect() {
        return this._data
    }

    disconnect() {

    }
}
