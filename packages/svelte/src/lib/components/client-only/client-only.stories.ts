import type { Meta } from '@storybook/svelte'

import BasicExample from './examples/basic.svelte'
import WithFallbackExample from './examples/with-fallback.svelte'

const meta: Meta = {
  title: 'Components/ClientOnly',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const WithFallback = {
  render: () => ({
    Component: WithFallbackExample,
  }),
}
