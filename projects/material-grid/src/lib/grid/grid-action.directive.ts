import { Directive, Input, Output, EventEmitter } from '@angular/core';

export class GridActionContext {
  constructor(config: {
    self?: any;
    icon?: string;
    show?: (rows: any[], action?: GridActionDirective) => boolean;
    more?: boolean;
  }) {
    if (config.self !== undefined) {
      this.self = config.self
    }

    if (config.icon !== undefined) {
      this.icon = config.icon
    }

    if (config.show !== undefined) {
      this.show = config.show
    }

    if (config.more !== undefined) {
      this.more = config.more
    }
  }
  public self: any = null;
  public icon: string;
  public show: (rows: any[], action?: GridActionDirective) => boolean = (rows: any[], action?: GridActionDirective) => true;
  public more: boolean = true;
}

@Directive({
  selector: 'grid-action'
})
export class GridActionDirective {
  private _label: string;

  @Input() name: string;
  @Input() set label(label: string) {
    this._label = label;
  }
  @Input() context: GridActionContext;

  @Output() handler = new EventEmitter<any[]>();
  
  constructor() {

  }

  get label() {
    if (!this._label) {
      return `action.${this.name}`;
    }
    return this._label;
  }

  show(rows: any[]) {
    return this.context.show(rows, this);
  }

  get icon() {
    return this.context.icon;
  }

  get more() {
    return this.context.more;
  }

  handle(rows: any[]) {
    this.handler.next(rows);
  }

}
