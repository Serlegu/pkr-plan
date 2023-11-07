export interface IConfig {
  app: App;
  baseUrl?: string;
  wsUrl?: string;
}

export interface App {
  language: string;
  name: string;
  rest: REST;
  modalConfig: ModalConfig;
}

export interface REST {
  endpoints?: Endpoints;
  headers?: Headers;
  host?: string;
  port?: null;
}

export interface Endpoints {
  getSessionList?: GetSessionList;
}

export interface GetSessionList {
  method?: string;
  uri?: string;
}

export interface Headers {
  acceptLanguage?: string;
}

export interface ModalConfig {
  width: string;
  disableClose: boolean;
  height: string;
}
