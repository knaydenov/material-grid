import { Component } from '@angular/core';
import { SimpleDataSource } from './simple-data-source';
import { TranslateService } from '@ngx-translate/core';
import { GridFilterContext, GridActionContext } from 'material-grid';
import { TextPickComponent } from './text-pick/text-pick.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataSource: SimpleDataSource = new SimpleDataSource();

  public positionFilterContext: GridFilterContext = new GridFilterContext({
    support: true,
    dialog: TextPickComponent
  });

  public nameFilterContext: GridFilterContext = new GridFilterContext({
    support: true,
  });

  public weightFilterContext: GridFilterContext = new GridFilterContext({
    support: true,
  });

  public symbolFilterContext: GridFilterContext = new GridFilterContext({
    support: true,
  });

  public viewActionContext = new GridActionContext({
    self: this,
    show: () => true,
    icon: 'pageview'
  });

  public deleteActionContext = new GridActionContext({
    self: this,
    icon: 'delete',
    show: () => true
  });

  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('ru');
    this.translate.use('ru');
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
    return ['view', 'delete'];
  }
  addRow($event) {

  }
  pickRows($event) {

  }
}
