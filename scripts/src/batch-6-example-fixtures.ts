export const batch6Examples = {
  'client-only': ['basic', 'with-fallback'],
  collection: [
    'async-list-filter',
    'async-list-reload',
    'async-list-sort-client-side',
    'list-selection-basic',
    'list-selection-multiple',
    'list-selection-range',
  ],
  'download-trigger': ['basic', 'svg', 'with-promise'],
  'focus-trap': ['autofocus', 'basic', 'initial-focus'],
  format: [
    'byte-basic',
    'byte-sizes',
    'byte-with-locale',
    'byte-with-unit',
    'byte-with-unit-display',
    'byte-with-unit-system',
    'number-basic',
    'number-with-compact',
    'number-with-currency',
    'number-with-locale',
    'number-with-percentage',
    'number-with-unit',
    'relative-time-basic',
    'relative-time-short',
    'time-basic',
    'time-with-am-pm-labels',
    'time-with-date',
    'time-with-locale',
    'time-with-seconds',
  ],
  frame: ['basic', 'inherit-styles', 'script', 'src-doc'],
  highlight: ['basic', 'dynamic-query', 'exact-match', 'ignore-case', 'match-all', 'multiple', 'repeating-text'],
  presence: ['basic', 'lazy-mount', 'lazy-mount-and-unmount-on-exit', 'skip-animation-on-mount', 'unmount-on-exit'],
  swap: ['fade', 'flip', 'rotate', 'scale'],
} as const

export const batch6ProviderExamples = {
  environment: ['setup', 'usage'],
  interaction: ['focus-visible', 'focus-visible-text-input', 'interaction'],
  locale: ['setup', 'usage'],
} as const

export const batch6Utilities = Object.keys(batch6Examples)

export const toPascalCase = (value: string) =>
  value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
