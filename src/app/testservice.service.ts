import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestserviceService {
  private annuswarams: { [key: string]: string } = {};
  constructor() { }

  addAnnuswaram(syllable: string, annuswaram: string) {
    this.annuswarams[syllable] = annuswaram;
  }

  getAnnuswaram(syllable: string): string | undefined {
    return this.annuswarams[syllable];
  }

  getAllAnnuswarams(): { [key: string]: string } {
    return this.annuswarams;
  }
}
