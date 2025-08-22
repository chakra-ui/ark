import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import InlineExample from './examples/inline.svelte'

const meta: Meta = {
  title: 'Components / DatePicker',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const Inline = {
  render: () => ({
    Component: InlineExample,
  }),
}
