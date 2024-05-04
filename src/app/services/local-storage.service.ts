import { Injectable } from '@angular/core';
import { Db } from '../models/db';

const LOCAL_STORAGE_KEY = 'TriGlazeData';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  db: Db = {
    steps: 1,
    ingredients: [
      { name: 'Barium carbonate', quantity: 100, unit: 'g' },
      { name: 'Red Iron Oxide', quantity: 50, unit: 'g' },
      { name: 'Zircopax ', quantity: 750, unit: 'mg' },
    ],
  };

  constructor() {
    this.Load();
    setInterval(() => this.Save(), 1000);
  }

  public Load(): void {
    try {
      const stringData = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '';
      if (stringData) {
        const data: Db = JSON.parse(stringData);
        if (data) this.db = data;
      }
    } catch (e) {
      console.error('LocalStorageService.Load()', e);
    }
  }

  public Save(): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.db));
    } catch (e) {
      console.error('LocalStorageService.Save()', e);
    }
  }
}
