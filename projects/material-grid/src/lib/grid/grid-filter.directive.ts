import { ComponentType } from '@angular/cdk/portal';
import { Directive, Input, Inject, forwardRef, TemplateRef } from '@angular/core';
import { GridComponent } from './grid.component';
import { MatDialogConfig } from '@angular/material';
import { GridDataSource } from '../grid-data-source';


export class GridFilterContext {
  constructor(config: {
    multiple?: boolean;
    self?: any;
    dialog?: any;
    dialogConfig?: MatDialogConfig;
    support?: ((filter: GridFilterDirective) => boolean) | boolean | string;
    toModel?: (value: any, filter?: GridFilterDirective) => string;
    toView?: (value: any, filter?: GridFilterDirective) => string;
    fromModel?: (value: string, filter?: GridFilterDirective) => any;

  }) {
    if (config.multiple !== undefined) {
      this.multiple = config.multiple
    }

    if (config.self !== undefined) {
      this.self = config.self
    }

    if (config.dialog !== undefined) {
      this.dialog = config.dialog
    }

    if (config.dialogConfig !== undefined) {
      this.dialogConfig = config.dialogConfig
    }

    if (config.support !== undefined) {
      this.support = config.support
    }

    if (config.toModel !== undefined) {
      this.toModel = config.toModel
    }

    if (config.toView !== undefined) {
      this.toView = config.toView
    }

    if (config.fromModel !== undefined) {
      this.fromModel = config.fromModel
    }
  }
  public field: string;
  public self: any = null;
  public dialog: ComponentType<any> | TemplateRef<any> = null;
  public dialogConfig: MatDialogConfig = {};
  public multiple = false;
  public support: ((filter: GridFilterDirective) => boolean) | boolean | string = undefined;
  public toModel: (value: any, filter?: GridFilterDirective) => string = (value: any, filter?: GridFilterDirective) => value;
  public toView: (value: any, filter?: GridFilterDirective) => string = (value: any, filter?: GridFilterDirective) => value;
  public fromModel: (value: string, filter?: GridFilterDirective) => any = (value: string, filter?: GridFilterDirective) => value;

}

@Directive({
  selector: 'grid-filter'
})
export class GridFilterDirective {
  private _field: string;
  private _value: any;
  private _title: string;

  constructor(
    @Inject(forwardRef(() => GridComponent)) private _gridComponent: GridComponent
  ) {

  }

  @Input() set title(title: string) {
    this._title = title;
  }
  @Input() context: GridFilterContext;
  @Input() set field(field: string) {
    this._field = field;
  }

  fromModel(value: string) {
    return this.context.fromModel(value, this);
  }

  toView(value: any) {
    return this.context.toView(value, this);
  }

  toModel(value: any) {
    return this.context.toModel(value, this);
  }

  get title() {
    if (!this._title) {
      return `filter.${this.field}`;
    }
    return this._title;
  }

  get multiple() {
    return this.context.multiple;
  }

  get support() {
    return this.context.support;
  }

  get dialogConfig() {
    return this.context.dialogConfig;
  }

  get dialog() {
    return this.context.dialog;
  }

  get dataSource(): GridDataSource<any> {
    return this._gridComponent.dataSource;
  }

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
  }

  get modelValue() {
    if (this.multiple) {
      return (<any[]>this.value).map(value => this.toModel(value));
    } else {
      return this.toModel(this._value);
    }
  }

  get viewValue() {
    if (this.multiple) {
      return (<any[]>this.value).map(value => this.toView(value));
    } else {
      return this.toView(this._value);
    }
  }

  get isActive() {
    return this.value !== undefined;
  }

  get isSupported() {
    if (this.support !== undefined) {
      if (typeof this.support === 'function') {
        return this.support(this);
      } else if (typeof this.support === 'boolean') {
        return this.support;
      } else if (typeof this.support === 'string') {
        switch (this.support) {
          case 'empty':
            return this.context.dialog && (!this.query || (typeof this.query === 'string' && !this.query.length));
          default:
            throw new Error('Unknown support function');
        }
      } else {
        throw new Error('Supported attribute type should be function, boolean or string.');
      }
    }
    return !!this.modelValue || this.context.dialog;
  }

  get field() {
    return this._field;
  }

  get key() {
    return this.field;
  }

  get label() {
    return this.title;
  }

  get query() {
    return this._gridComponent.filterQuery;
  }

  get queryLabel() {
    if (this.query) {
      return `${this.title}: ${this.query}`;
    }
    return this.title;
  }
}
