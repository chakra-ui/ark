import type { Preview } from '@storybook/react'

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
