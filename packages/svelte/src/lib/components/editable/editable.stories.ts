import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import CustomControlsExample from './examples/custom-controls.svelte'
import RenderFnExample from './examples/render-fn.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithFieldExample from './examples/with-field.svelte'

const meta: Meta = {
  title: 'Components / Editable',
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

export const RenderFn = {
  render: () => ({
    Component: RenderFnExample,
  }),
}

export const CustomControls = {
  render: () => ({
    Component: CustomControlsExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}
