import { TestBed } from '@angular/core/testing';
import { SanStorage, SanStorageAction } from './storage.service';

describe('SanStorage', () => {
  let service: SanStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SanStorage] });
    service = TestBed.inject(SanStorage);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should be called getItem', () => {
    const spy = spyOn(service.local, 'getItem').and.callThrough();
    service.local.getItem('item');
    expect(spy).toHaveBeenCalled();
  });

  it('should be called setItem', () => {
    const spy = spyOn(service.local, 'setItem').and.callThrough();
    service.local.setItem('item', 1, { emitEvent: true });
    expect(spy).toHaveBeenCalled();
  });

  it('should be called setItem no options', () => {
    const spy = spyOn(service.local, 'setItem').and.callThrough();
    service.local.setItem('item', 1, { emitEvent: false });
    expect(spy).toHaveBeenCalled();
  });

  it('should be called removeItem', () => {
    const spy = spyOn(service.local, 'removeItem').and.callThrough();
    service.local.removeItem('item', { emitEvent: true });
    expect(spy).toHaveBeenCalled();
  });

  it('should be called removeItem without emitting event', () => {
    const spy = spyOn(service.local, 'removeItem').and.callThrough();
    service.local.removeItem('item', { emitEvent: false });
    expect(spy).toHaveBeenCalled();
  });

  it('should be called clear', () => {
    const spy = spyOn(service.local, 'clear').and.callThrough();
    service.local.clear({ emitEvent: true });
    expect(spy).toHaveBeenCalled();
  });

  it('should be called clear without emitting event ', () => {
    const spy = spyOn(service.local, 'clear').and.callThrough();
    service.local.clear({ emitEvent: false });
    expect(spy).toHaveBeenCalled();
  });

  it('should be called changes without options', () => {
    const spy = spyOn(service.local, 'changes').and.callThrough();
    service.local.changes();
    expect(spy).toHaveBeenCalled();
  });

  it('should be called changes with empty options', () => {
    const spy = spyOn(service.local, 'changes').and.callThrough();
    service.local.changes({});
    expect(spy).toHaveBeenCalled();
  });

  it('should be called changes', () => {
    const spy = spyOn(service.local, 'changes').and.callThrough();
    service.local.changes({ key: 'test', action: SanStorageAction.CREATE });
    expect(spy).toHaveBeenCalled();
  });
});
