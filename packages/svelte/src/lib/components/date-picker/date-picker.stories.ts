import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import StandaloneExample from './examples/standalone.svelte'

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

export const Standalone = {
  render: () => ({
    Component: StandaloneExample,
  }),
}
