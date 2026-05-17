import { provideZonelessChangeDetection } from '@angular/core'
import { applicationConfig } from '@storybook/angular'
import '../../../.storybook/modules/global.css'
import '../../../.storybook/modules/theme.css'

export default {
  decorators: [applicationConfig({ providers: [provideZonelessChangeDetection()] })],
  parameters: {
    actions: { disable: true },
    backgrounds: { disable: true },
    controls: { disable: true },
    layout: 'padded',
    viewport: { disable: true },
  },
}
