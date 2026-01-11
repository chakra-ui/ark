import type { Meta } from '@storybook/svelte'

import BasicExample from './examples/basic.svelte'
import BlurBehaviorExample from './examples/blur-behavior.svelte'
import ControlledExample from './examples/controlled.svelte'
import ControlledInputValueExample from './examples/controlled-input-value.svelte'
import DelimiterExample from './examples/delimiter.svelte'
import DisabledExample from './examples/disabled.svelte'
import DisabledEditingExample from './examples/disabled-editing.svelte'
import InvalidExample from './examples/invalid.svelte'
import MaxTagLengthExample from './examples/max-tag-length.svelte'
import MaxWithOverflowExample from './examples/max-with-overflow.svelte'
import PasteBehaviorExample from './examples/paste-behavior.svelte'
import ProgrammaticControlExample from './examples/programmatic-control.svelte'
import ReadonlyExample from './examples/readonly.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import ValidationExample from './examples/validation.svelte'
import WithComboboxExample from './examples/with-combobox.svelte'
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

export const ControlledInputValue = {
  render: () => ({
    Component: ControlledInputValueExample,
  }),
}

export const Delimiter = {
  render: () => ({
    Component: DelimiterExample,
  }),
}

export const Disabled = {
  render: () => ({
    Component: DisabledExample,
  }),
}

export const DisabledEditing = {
  render: () => ({
    Component: DisabledEditingExample,
  }),
}

export const Invalid = {
  render: () => ({
    Component: InvalidExample,
  }),
}

export const MaxTagLength = {
  render: () => ({
    Component: MaxTagLengthExample,
  }),
}

export const MaxWithOverflow = {
  render: () => ({
    Component: MaxWithOverflowExample,
  }),
}

export const PasteBehavior = {
  render: () => ({
    Component: PasteBehaviorExample,
  }),
}

export const ProgrammaticControl = {
  render: () => ({
    Component: ProgrammaticControlExample,
  }),
}

export const Readonly = {
  render: () => ({
    Component: ReadonlyExample,
  }),
}

export const Validation = {
  render: () => ({
    Component: ValidationExample,
  }),
}

export const WithCombobox = {
  render: () => ({
    Component: WithComboboxExample,
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
