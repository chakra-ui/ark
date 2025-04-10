import type { Preview } from '@storybook/react'
import '@ark-ui/shared/styles.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    layout: 'padded',
  },
}

export default preview
