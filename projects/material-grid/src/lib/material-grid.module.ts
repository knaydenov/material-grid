import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatPaginatorModule, MatCardModule, MatTableModule, MatTooltipModule, MatIconModule, MatButtonModule, MatPseudoCheckboxModule, MatAutocompleteModule, MatChipsModule, MatProgressBarModule, MatDividerModule, MatMenuModule, MatPaginatorIntl } from '@angular/material';
import { GridComponent } from './grid/grid.component';
import { GridActionDirective } from './grid/grid-action.directive';
import { GridFilterDirective } from './grid/grid-filter.directive';
import { GridActionDefDirective } from './grid/grid-action-def.directive';
import { GridFilterDefDirective } from './grid/grid-filter-def.directive';
import { ReactiveFormsModule } from '@angular/forms';

const EXPORTED_DECLARATIONS = [
  GridComponent,
  GridActionDirective, 
  GridFilterDirective,
  GridActionDefDirective,
  GridFilterDefDirective
];

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
    ReactiveFormsModule
  ],
  declarations: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS
})
export class MaterialGridModule { }
