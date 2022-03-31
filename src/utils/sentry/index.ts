import * as Sentry from '@sentry/browser';

export const setupSentry = (options: Sentry.BrowserOptions = {}) => {
  return Sentry.init({
    dsn: 'https://57337fdf24e543d88767d03816424020@o1124000.ingest.sentry.io/6162233',

    maxBreadcrumbs: 50,
    debug: false,

    tracesSampleRate: 1,
    ...options,
  });
};
