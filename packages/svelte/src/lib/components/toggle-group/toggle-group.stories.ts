import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import MultipleExample from './examples/multiple.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components / Toggle Group',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Multiple = {
  render: () => ({
    Component: MultipleExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
