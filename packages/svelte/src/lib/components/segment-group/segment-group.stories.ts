import type { Meta } from '@storybook/svelte'

import BasicExample from './examples/basic.svelte'
import ConditionalExample from './examples/conditional.svelte'
import ControlledExample from './examples/controlled.svelte'
import DisabledExample from './examples/disabled.svelte'
import InitialValueExample from './examples/initial-value.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components / Segment Group',
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

export const Disabled = {
  render: () => ({
    Component: DisabledExample,
  }),
}

export const InitialValue = {
  render: () => ({
    Component: InitialValueExample,
  }),
}

export const Conditional = {
  render: () => ({
    Component: ConditionalExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
