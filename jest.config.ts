import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  coverageReporters: ['json', 'clover', 'html', 'cobertura'],
  setupFiles: ['./src/setupTests.ts'],
  testEnvironment: 'node',
  testTimeout: 30_000,
};

export default config;
