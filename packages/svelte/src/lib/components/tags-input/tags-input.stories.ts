import type { Meta } from '@storybook/svelte'

import BasicExample from './examples/basic.svelte'
import BlurBehaviorExample from './examples/blur-behavior.svelte'
import ControlledExample from './examples/controlled.svelte'
import DisabledEditingExample from './examples/disabled-editing.svelte'
import InitialValueExample from './examples/initial-value.svelte'
import MaxWithOverflowExample from './examples/max-with-overflow.svelte'
import OnEventExample from './examples/on-event.svelte'
import PasteBehaviorExample from './examples/paste-behavior.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import ValidatedExample from './examples/validated.svelte'
import WithFieldExample from './examples/with-field.svelte'

const meta: Meta = {
  title: 'Components/TagsInput',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const BlurBehavior = {
  render: () => ({
    Component: BlurBehaviorExample,
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

export const OnEvent = {
  render: () => ({
    Component: OnEventExample,
  }),
}

export const PasteBehavior = {
  render: () => ({
    Component: PasteBehaviorExample,
  }),
}

export const Validated = {
  render: () => ({
    Component: ValidatedExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
