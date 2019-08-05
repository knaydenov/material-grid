import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialGridModule } from 'material-grid';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MatTableModule, MatDialogModule, MatPaginatorModule, MatCardModule, MatTooltipModule, MatIconModule, MatButtonModule, MatPseudoCheckboxModule, MatAutocompleteModule, MatChipsModule, MatProgressBarModule, MatDividerModule, MatMenuModule } from '@angular/material';
import { TextPickComponent } from './text-pick/text-pick.component';
import { ReactiveFormsModule } from '@angular/forms';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    TextPickComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialGridModule,
    HttpClientModule,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TextPickComponent]
})
export class AppModule { }
