export const configData = {
  baseUrl: 'http://localhost:8080',
  app: {
    language: 'es',
    rest: {
      host: 'https://seg-remoto-gateway-sgt-remoto-dispos-dev.apps.sgt01.sgt.dev.cn1.paas.cloudcenter.corp/',
      port: null,
      endpoints: {
        getSessionList: {
          method: 'GET',
          uri: 'sessions',
        },
      },
    },
  },
};

export const configDataTest = {
  baseUrl: 'http://localhost:8080',
  app: {
    language: 'es',
    rest: {
      host: 'TBD',
      port: null,
      headers: {
        acceptLanguage: 'pt-PT',
      },
      endpoints: {
        getSessionList: {
          method: 'GET',
          uri: 'sessions/',
        },
      },
    },
  },
};
