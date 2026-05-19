import { provideZonelessChangeDetection } from '@angular/core'
import { applicationConfig } from '@storybook/angular'

export default {
  decorators: [applicationConfig({ providers: [provideZonelessChangeDetection()] })],
  parameters: {
    actions: { disable: true },
    backgrounds: { disable: true },
    controls: { disable: true },
    layout: 'padded',
    options: {
      storySort: {
        order: ['Utilities', 'Providers', 'Components'],
        method: 'alphabetical',
      },
    },
    viewport: { disable: true },
  },
}
