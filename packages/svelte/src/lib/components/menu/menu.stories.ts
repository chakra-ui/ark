import type { Meta } from '@storybook/svelte'

import BasicExample from './examples/basic.svelte'
import CheckboxExample from './examples/checkbox.svelte'
import ContextExample from './examples/context.svelte'
import ControlledExample from './examples/controlled.svelte'
import GroupExample from './examples/group.svelte'
import NestedExample from './examples/nested.svelte'
import RadioGroupExample from './examples/radio-group.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import SelectEventExample from './examples/select-event.svelte'
import SeparatorExample from './examples/separator.svelte'
import WithContextExample from './examples/with-context.svelte'

const meta: Meta = {
  title: 'Components / Menu',
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

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const RadioGroup = {
  render: () => ({
    Component: RadioGroupExample,
  }),
}

export const Separator = {
  render: () => ({
    Component: SeparatorExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const WithContext = {
  render: () => ({
    Component: WithContextExample,
  }),
}

export const Checkbox = {
  render: () => ({
    Component: CheckboxExample,
  }),
}

export const Group = {
  render: () => ({
    Component: GroupExample,
  }),
}

export const SelectEvent = {
  render: () => ({
    Component: SelectEventExample,
  }),
}

export const Nested = {
  render: () => ({
    Component: NestedExample,
  }),
}
