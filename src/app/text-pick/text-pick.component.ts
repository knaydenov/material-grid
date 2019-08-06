import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

export interface ITextPickComponent {
  value?: string|string[];
  multiple?: boolean;
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
    this.textControl = new FormControl(this._data.value);
  }

  get value() {
    if (!this.textControl.value) {
      return null;
    }
    return this._data.multiple ? (<string>this.textControl.value).split(';') : this.textControl.value;
  }
  ngOnInit() {
  }

}
