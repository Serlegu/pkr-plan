import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public readonly session: StorageDefinition;
  public readonly local: StorageDefinition;

  constructor() {
    this.session = new BrowserStorageWrapper(window.sessionStorage);
    this.local = new BrowserStorageWrapper(window.localStorage);
  }
}

export interface IStorageOptions {
  emitEvent?: boolean;
}

export enum StorageAction {
  CREATE = 'CREATE',
  DELETE_ITEM = 'DELETE_ITEM',
  DELETE_All = 'DELETE_All',
}

export interface IStorageChange<T = any> {
  action: StorageAction;
  key?: string;
  value?: T;
}

/**
 * Common definition for a Storage
 */
export interface StorageDefinition {
  setItem<T>(key: string, value: T, options?: IStorageOptions): void;
  getItem<T>(key: string): T;
  removeItem(key: string, options?: IStorageOptions): void;
  clear(options?: IStorageOptions): void;
  changes<T>(options?: {
    key?: string;
    action?: StorageAction;
  }): Observable<IStorageChange<T>>;
}

/**
 * This wrapper can be use for session an local storage because both have the same contract
 */
class BrowserStorageWrapper implements StorageDefinition {
  private readonly subject: Subject<IStorageChange>;

  constructor(private storage: Storage) {
    this.subject = new Subject<IStorageChange>();
  }

  public setItem<T>(key: string, value: T, options?: IStorageOptions): void {
    this.storage.setItem(key, JSON.stringify(value));
    if (!options || options.emitEvent !== false) {
      this.subject.next({
        action: StorageAction.CREATE,
        key,
        value,
      });
    }
  }

  public getItem<T>(key: string): T {
    const json = this.storage.getItem(key) || '';
    let result: T = null as T;

    try {
      result = JSON.parse(json) as T;
    } catch (err) {}

    return result;
  }

  public removeItem(key: string, options?: IStorageOptions): void {
    this.storage.removeItem(key);
    if (!options || options.emitEvent !== false) {
      this.subject.next({
        action: StorageAction.DELETE_ITEM,
        key,
      });
    }
  }

  public clear(options?: IStorageOptions): void {
    this.storage.clear();
    if (!options || options.emitEvent !== false) {
      this.subject.next({
        action: StorageAction.DELETE_All,
      });
    }
  }

  public changes<T>(options?: {
    key?: string;
    action?: StorageAction;
  }): Observable<IStorageChange<T>> {
    const obs$ = this.subject.asObservable();
    if (!options || (!options.key && !options.action)) {
      return obs$;
    }
    return obs$.pipe(
      filter((item) => {
        const key = !options.key ? true : item.key === options.key;
        const action = !options.action ? true : item.action === options.action;
        return key && action;
      })
    );
  }
}
