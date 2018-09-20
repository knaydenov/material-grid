import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatPaginatorModule, MatCardModule, MatTableModule, MatTooltipModule, MatIconModule, MatButtonModule, MatPseudoCheckboxModule, MatAutocompleteModule, MatChipsModule, MatProgressBarModule, MatDividerModule, MatMenuModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { GridComponent } from './grid/grid.component';
import { GridActionDirective } from './grid/grid-action.directive';
import { GridFilterDirective } from './grid/grid-filter.directive';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatPseudoCheckboxModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatProgressBarModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [GridComponent, GridActionDirective, GridFilterDirective],
  exports: [
    GridComponent,
    GridActionDirective,
    GridFilterDirective,
    MatDialogModule,
    MatPaginatorModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatPseudoCheckboxModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatProgressBarModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class MaterialGridModule { }
