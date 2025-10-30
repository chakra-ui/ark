import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import BlurBehaviorExample from './examples/blur-behavior.vue'
import ControlledExample from './examples/controlled.vue'
import ControlledInputValueExample from './examples/controlled-input-value.vue'
import DelimiterExample from './examples/delimiter.vue'
import DisabledExample from './examples/disabled.vue'
import DisabledEditingExample from './examples/disabled-editing.vue'
import InitialValueExample from './examples/initial-value.vue'
import InvalidExample from './examples/invalid.vue'
import MaxTagLengthExample from './examples/max-tag-length.vue'
import MaxWithOverflowExample from './examples/max-with-overflow.vue'
import OnEventExample from './examples/on-event.vue'
import PasteBehaviorExample from './examples/paste-behavior.vue'
import ProgrammaticControlExample from './examples/programmatic-control.vue'
import ReadonlyExample from './examples/readonly.vue'
import RootProviderExample from './examples/root-provider.vue'
import ValidationExample from './examples/validation.vue'
import WithFieldExample from './examples/with-field.vue'

const meta: Meta = {
  title: 'Components / TagsInput',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const BlurBehavior = {
  render: () => ({
    components: { Component: BlurBehaviorExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const ControlledInputValue = {
  render: () => ({
    components: { Component: ControlledInputValueExample },
    template: '<Component />',
  }),
}

export const Delimiter = {
  render: () => ({
    components: { Component: DelimiterExample },
    template: '<Component />',
  }),
}

export const Disabled = {
  render: () => ({
    components: { Component: DisabledExample },
    template: '<Component />',
  }),
}

export const DisabledEditing = {
  render: () => ({
    components: { Component: DisabledEditingExample },
    template: '<Component />',
  }),
}

export const InitialValue = {
  render: () => ({
    components: { Component: InitialValueExample },
    template: '<Component />',
  }),
}

export const Invalid = {
  render: () => ({
    components: { Component: InvalidExample },
    template: '<Component />',
  }),
}

export const MaxTagLength = {
  render: () => ({
    components: { Component: MaxTagLengthExample },
    template: '<Component />',
  }),
}

export const MaxWithOverflow = {
  render: () => ({
    components: { Component: MaxWithOverflowExample },
    template: '<Component />',
  }),
}

export const OnEvent = {
  render: () => ({
    components: { Component: OnEventExample },
    template: '<Component />',
  }),
}

export const PasteBehavior = {
  render: () => ({
    components: { Component: PasteBehaviorExample },
    template: '<Component />',
  }),
}

export const ProgrammaticControl = {
  render: () => ({
    components: { Component: ProgrammaticControlExample },
    template: '<Component />',
  }),
}

export const Readonly = {
  render: () => ({
    components: { Component: ReadonlyExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const Validation = {
  render: () => ({
    components: { Component: ValidationExample },
    template: '<Component />',
  }),
}

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}
