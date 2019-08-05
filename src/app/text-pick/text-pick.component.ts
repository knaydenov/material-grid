import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

export interface ITextPickComponent {
  value?: string;
}

@Component({
  selector: 'app-text-pick',
  templateUrl: './text-pick.component.html',
  styleUrls: ['./text-pick.component.scss']
})
export class TextPickComponent implements OnInit {
  textControl: FormControl;
  constructor(
    protected _dialogRef: MatDialogRef<TextPickComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) protected _data: ITextPickComponent
  ) {
    this.textControl = new FormControl(this.value);
  }

  get value() {
    return this._data.value;
  }

  set value(value: string) {
    this._data.value = value;
  }

  ngOnInit() {
  }

}
