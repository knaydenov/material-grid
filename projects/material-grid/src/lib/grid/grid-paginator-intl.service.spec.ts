import { TestBed, inject } from '@angular/core/testing';

import { GridPaginatorIntlService } from './grid-paginator-intl.service';

describe('GridPaginatorIntlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridPaginatorIntlService]
    });
  });

  it('should be created', inject([GridPaginatorIntlService], (service: GridPaginatorIntlService) => {
    expect(service).toBeTruthy();
  }));
});
