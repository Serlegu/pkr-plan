import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConfig } from '../models/config.interface';

/**
 * ConfigService
 * @export
 * ConfigService
 */
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config: IConfig;
  options: any;

  constructor(private readonly http: HttpClient) {}

  init(): Promise<any> {
    return new Promise((resolveInit, rejectInit) => {
      // Get the configuration from Angular proxy
      this.http
        .get('/frontconfig')
        .toPromise()
        .then((data: any) => {
          this.setConfigService(data);
          // Resolve after everything is set up
          resolveInit(true);
        })
        .catch(() => {
          console.error('Error loading configuration file.');
          rejectInit();
        });
    });
  }

  /**
   *
   * Update data of config
   *
   */
  setConfigService(configData: any) {
    this.config = configData;
  }
}
