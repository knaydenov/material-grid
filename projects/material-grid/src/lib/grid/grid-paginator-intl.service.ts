import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

enum Label {
  ITEMS_PER_PAGE = "Items per page:",
  NEXT_PAGE = "Next page",
  PREVIOUS_PAGE = "Previous page",
  FIRST_PAGE = "First page",
  LAST_PAGE = "Last page",
  OF = "of"
}

@Injectable({
  providedIn: 'root'
})
export class GridPaginatorIntlService extends MatPaginatorIntl {
  constructor(
    private translate: TranslateService
  ) {
    super();

    this.translate.onLangChange.subscribe(() => {
      this.initTranslations();
    });
  
    this.initTranslations();
  }

  private of = Label.OF;

  initTranslations() {
    this
      .translate
      .get([
        Label.ITEMS_PER_PAGE,
        Label.NEXT_PAGE,
        Label.PREVIOUS_PAGE,
        Label.FIRST_PAGE,
        Label.LAST_PAGE,
        Label.OF
      ])
      .subscribe((translation: any) => {
        this.itemsPerPageLabel = translation[Label.ITEMS_PER_PAGE];
        this.nextPageLabel = translation[Label.NEXT_PAGE];
        this.previousPageLabel = translation[Label.PREVIOUS_PAGE];
        this.firstPageLabel = translation[Label.FIRST_PAGE];
        this.lastPageLabel = translation[Label.LAST_PAGE];
        this.of = translation[Label.OF];

        this.changes.next();
      });
  }

  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length == 0 || pageSize == 0) { return `0 ${this.of} ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} ${this.of} ${length}`;
  };
}
