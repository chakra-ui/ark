import type { Preview } from '@storybook/react'
import '../../../.storybook/styles.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Utilities', 'Providers', 'Components'],
        method: 'alphabetical',
      },
    },
    layout: 'padded',
  },
}

export default preview
