import type { Meta } from '@storybook/svelte'

import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import DisabledEditingExample from './examples/disabled-editing.svelte'
import InitialValueExample from './examples/initial-value.svelte'
import MaxWithOverflowExample from './examples/max-with-overflow.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components/TagsInput',
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

export const DisabledEditing = {
  render: () => ({
    Component: DisabledEditingExample,
  }),
}

export const InitialValue = {
  render: () => ({
    Component: InitialValueExample,
  }),
}

export const MaxWithOverflow = {
  render: () => ({
    Component: MaxWithOverflowExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
