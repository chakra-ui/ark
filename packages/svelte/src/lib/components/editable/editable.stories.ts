import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ContextExample from './examples/context.svelte'
import ControlledExample from './examples/controlled.svelte'
import ControlsExample from './examples/controls.svelte'
import DoubleClickExample from './examples/double-click.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import TextareaExample from './examples/textarea.svelte'
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

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Controls = {
  render: () => ({
    Component: ControlsExample,
  }),
}

export const DoubleClick = {
  render: () => ({
    Component: DoubleClickExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const Textarea = {
  render: () => ({
    Component: TextareaExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}
