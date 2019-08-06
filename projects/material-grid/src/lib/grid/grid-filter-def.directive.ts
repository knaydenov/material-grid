import { Directive } from '@angular/core';
import { Observable } from 'rxjs';

export type DialogType = (value: any) => Observable<any>;
export type SupportType = ((query: string) => boolean) | boolean;
export type ToModelType = (value: any) => string;
export type ToViewType = (value: any) => string;
export type FromModelType = (value: string) => any;

@Directive({
  selector: '[gridFilterDef]',
  inputs: [
    'field: gridFilterDefField',
    'label: gridFilterDefLabel',
    'multiple: gridFilterDefMultiple',
    'dialog: gridFilterDefDialog',
    'support: gridFilterDefSupport',
    'toModel: gridFilterDefToModel',
    'toView: gridFilterDefToView',
    'fromModel: gridFilterDefFromModel',
    'this: gridFilterDefThis',
  ],
})
export class GridFilterDefDirective {

  constructor() { }

  field: string;
  label: string;
  multiple: boolean = false;
  dialog: DialogType;
  support: SupportType = true;
  toModel: ToModelType = (value: any) => value;
  toView: ToViewType = (value: any) => value;
  fromModel: FromModelType = (value: string) => value;
  this: any;

  value: any;

  openDialog(): Observable<any> {
    if (typeof this.dialog === 'function') {
      const dialog = this.dialog.bind(this.this);
      return dialog(this.value);
    }
    return null;
  }

  shouldSupport(query: string) {
    if (typeof this.support === 'boolean') {
      return this.support;
    } else if (typeof this.support === 'function') {
      const support = this.support.bind(this.this);
      return support(query);
    }
    return false;
  }

  convertToModelValue(value: any) {
    if (typeof this.toModel === 'function') {
      const convertToModelValue = this.toModel.bind(this.this);
      return convertToModelValue(value);
    }
    return value;
  }

  convertToViewValue(value: any) {
    if (typeof this.toView === 'function') {
      const convertToViewValue = this.toView.bind(this.this);
      return convertToViewValue(value);
    }
    return value;
  }

  convertFromModelValue(value: string) {
    if (typeof this.fromModel === 'function') {
      const convertFromModelValue = this.fromModel.bind(this.this);
      return convertFromModelValue(value);
    }
    return value;
  }

  get viewValue() {
    if (!this.value) {
        return null;
    } else if (this.multiple) {
      return (<any[]>this.value).map(value => this.convertToViewValue(value)).join(', ');
    } else {
      return this.convertToViewValue(this.value);
    }
  }

  get isActive() {
    return this.value !== undefined;
  }
}
