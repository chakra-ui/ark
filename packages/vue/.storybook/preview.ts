import type { Preview } from '@storybook/vue3'
import './main.css'

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