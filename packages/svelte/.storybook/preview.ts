import type { Preview } from '@storybook/sveltekit'
import '../../../.storybook/modules/global.css'
import '../../../.storybook/modules/theme.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Utilities', 'Providers', 'Components'],
        method: 'alphabetical',
      },
    },
    layout: 'padded',
    actions: { disable: true },
    controls: { disable: true },
    backgrounds: { disable: true },
    viewport: { disable: true },
    sveltekit_experimental: {
      // Disable the experimental SvelteKit mocks that use Svelte 5 runes
      skip: true,
    },
  },
}

export default preview
