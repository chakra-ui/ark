import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'

const meta: Meta = {
  title: 'Components/Tour',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}
