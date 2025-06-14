import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import DisabledExample from './examples/disabled.svelte'
import GroupWithFormExample from './examples/group-with-form.svelte'
import GroupWithInvalidExample from './examples/group-with-invalid.svelte'
import GroupWithSelectAllExample from './examples/group-with-select-all.svelte'
import GroupExample from './examples/group.svelte'
import IndeterminateExample from './examples/indeterminate.svelte'
import ContextExample from './examples/render-prop.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components/Checkbox',
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Indeterminate = {
  render: () => ({
    Component: IndeterminateExample,
  }),
}

export const Disabled = {
  render: () => ({
    Component: DisabledExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const Group = {
  render: () => ({
    Component: GroupExample,
  }),
}

export const GroupWithForm = {
  render: () => ({
    Component: GroupWithFormExample,
  }),
}

export const GroupWithInvalid = {
  render: () => ({
    Component: GroupWithInvalidExample,
  }),
}

export const GroupWithSelectAll = {
  render: () => ({
    Component: GroupWithSelectAllExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
