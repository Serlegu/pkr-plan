import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from './config.service';
import { configData, configDataTest } from '../models/config-fake.service.spec';
import { IConfig } from '../models/config.interface';
import { IconOptions } from '@angular/material/icon';

export function initializeApp(mrwService: ConfigService) {
  return () => {
    mrwService.config = configData as IConfig;
  };
}

describe('ConfigService', () => {
  let httpTestingController: HttpTestingController;
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ConfigService);

    sessionStorage.setItem('config', JSON.stringify('/assets/config.json'));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test init', () => {
    service.init();
    expect(service.config).not.toBeNull();
  });

  it('should config language', () => {
    service.config = configData as IConfig;
    const configAfter = configDataTest;
    service.setConfigService(configAfter);
    expect(service.config.app.language).not.toBe('en');
  });

});
