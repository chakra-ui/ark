import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import DefaultCheckedExample from './examples/default-checked.svelte'
import DisabledExample from './examples/disabled.svelte'
import GroupProviderExample from './examples/group-provider.svelte'
import GroupWithFormExample from './examples/group-with-form.svelte'
import GroupWithInvalidExample from './examples/group-with-invalid.svelte'
import GroupWithSelectAllExample from './examples/group-with-select-all.svelte'
import GroupExample from './examples/group.svelte'
import IndeterminateExample from './examples/indeterminate.svelte'
import ProgrammaticControlExample from './examples/programmatic-control.svelte'
import ContextExample from './examples/context.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithFieldExample from './examples/with-field.svelte'
import GroupWithFieldsetExample from './examples/group-with-fieldset.svelte'
import WithFormExample from './examples/with-form.svelte'

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

export const DefaultChecked = {
  render: () => ({
    Component: DefaultCheckedExample,
  }),
}

export const ProgrammaticControl = {
  render: () => ({
    Component: ProgrammaticControlExample,
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

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}

export const GroupWithFieldset = {
  render: () => ({
    Component: GroupWithFieldsetExample,
  }),
}

export const WithForm = {
  render: () => ({
    Component: WithFormExample,
  }),
}

export const GroupProvider = {
  render: () => ({
    Component: GroupProviderExample,
  }),
}
