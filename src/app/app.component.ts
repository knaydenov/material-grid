import { Component } from '@angular/core';
import { SimpleDataSource } from './simple-data-source';
import { TranslateService } from '@ngx-translate/core';
import { TextPickComponent, ITextPickComponent } from './text-pick/text-pick.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataSource: SimpleDataSource = new SimpleDataSource();

  showForSingleRow(rows: any) {
    return rows.length === 1;
  }

  showForMultipleRows(rows: any) {
    return rows.length > 1;
  }

  openTextFilterDialog(value: string) {
    return this.dialog.open<TextPickComponent, ITextPickComponent>(TextPickComponent, {
      data: {
        value: value
      }
    }).afterClosed();
  }

  openSymbolFilterDialog(value: string[]) {
    return this.dialog.open<TextPickComponent, ITextPickComponent>(TextPickComponent, {
      data: {
        value: value,
        multiple: true
      }
    }).afterClosed();
  }

  constructor(
    private translate: TranslateService,
    private dialog: MatDialog
  ) {
    this.translate.setDefaultLang('ru');
    this.translate.use('ru');
    console.log(this.dialog);
  }

  get showAdd() {
    return true;
  }

  get showPick() {
    return true;
  }

  get showSelection() {
    return true;
  }

  get showState() {
    return true;
  }

  get showFilters() {
    return true;
  }

  get columns() {
    return ['position', 'name', 'weight', 'symbol'];
  }
  get filters() {
    return ['position', 'name', 'weight', 'symbol'];
  }
  get actions() {
    return ['calculate', 'add', 'view', 'edit', 'shuffle', 'delete'];
  }
  
  addAction($event) {
    console.log('Called addAction', $event);
  }

  calculateAction($event) {
    console.log('Called calculateAction', $event);
  }

  viewAction($event) {
    console.log('Called viewAction', $event);
  }

  shuffleAction($event) {
    console.log('Called shuffleAction', $event);
  }

  editAction($event) {
    console.log('Called editAction', $event);
  }

  deleteAction($event) {
    console.log('Called deleteAction', $event);
  }
}
