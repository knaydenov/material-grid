import { Directive } from '@angular/core';

export enum Strategy {
  GRID = 'grid',
  ROW = 'row',
  MORE = 'more'
}

export type ShowType = ((rows?: any[]) => boolean) | boolean;
export type EnableType = ((rows?: any[]) => boolean) | boolean;
export type HandlerType = (rows?: any[]) => void;

@Directive({
  selector: '[gridActionDef]',
  inputs: [
    'name: gridActionDefName',
    'label: gridActionDefLabel',
    'icon: gridActionDefIcon',
    'strategy: gridActionDefStrategy',
    'show: gridActionDefShow',
    'enable: gridActionDefEnable',
    'handler: gridActionDefHandler',
    'this: gridActionDefThis',
  ],
})
export class GridActionDefDirective {

  constructor() { }
  
  name: string;
  label: string;
  icon: string;
  strategy: Strategy = Strategy.ROW;
  show: ShowType = true;
  enable: EnableType = true;
  handler: HandlerType;
  this: any;

  handle(rows?: any[]) {
    if (typeof this.handler === 'function') {
      const handler = this.handler.bind(this.this);
      handler(rows);
    }
  }

  shouldShow(rows?: any[]): boolean {
    if (typeof this.show === 'boolean') {
      return this.show;
    } else if (typeof this.show === 'function') {
      const show = this.show.bind(this.this);
      return show(rows);
    }
    return false;
  }

  shouldEnable(rows?: any[]): boolean {
    if (typeof this.enable === 'boolean') {
      return this.enable;
    } else if (typeof this.enable === 'function') {
      const enable = this.enable.bind(this.this);
      return enable(rows);
    }
    return false;
  }

}
