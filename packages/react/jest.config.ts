import type { Config } from '@jest/types'

const jestConfig: Config.InitialOptions = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': [
      '@swc/jest',
      { jsc: { transform: { react: { runtime: 'automatic' } } } },
    ],
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', './src/setup-test.ts'],
}

export default jestConfig
