import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatPaginatorModule, MatCardModule, MatTableModule, MatTooltipModule, MatIconModule, MatButtonModule, MatPseudoCheckboxModule, MatAutocompleteModule, MatChipsModule, MatProgressBarModule, MatDividerModule, MatMenuModule, MatPaginatorIntl } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { GridComponent } from './grid/grid.component';
import { GridActionDirective } from './grid/grid-action.directive';
import { GridFilterDirective } from './grid/grid-filter.directive';
import { TranslateModule } from '@ngx-translate/core';
import { GridPaginatorIntlService } from './grid/grid-paginator-intl.service';

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
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: GridPaginatorIntlService,
    },
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
