import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import CallbackExample from './examples/callback.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Utilities / Sizer',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Callback = {
  render: () => ({
    Component: CallbackExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
