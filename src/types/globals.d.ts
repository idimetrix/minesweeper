export {};

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      NODE_ENV: string;
      REACT_APP_ENABLE_TRACKER: string;
      REACT_APP_ENABLE_VITALS: string;
      REACT_APP_SOCKET_ENDPOINT: string;
    };
  }
}
