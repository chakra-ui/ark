import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import InitialValueExample from './examples/initial-value.svelte'
import MultipleExample from './examples/multiple.svelte'
import RenderFnExample from './examples/render-fn.svelte'
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

export const InitialValue = {
  render: () => ({
    Component: InitialValueExample,
  }),
}

export const Multiple = {
  render: () => ({
    Component: MultipleExample,
  }),
}

export const RenderFn = {
  render: () => ({
    Component: RenderFnExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
