import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import BlurBehaviorExample from './examples/blur-behavior.vue'
import ControlledExample from './examples/controlled.vue'
import DisabledEditingExample from './examples/disabled-editing.vue'
import InitialValueExample from './examples/initial-value.vue'
import MaxWithOverflowExample from './examples/max-with-overflow.vue'
import OnEventExample from './examples/on-event.vue'
import PasteBehaviorExample from './examples/paste-behavior.vue'
import RootProviderExample from './examples/root-provider.vue'
import ValidatedExample from './examples/validated.vue'
import WithFieldExample from './examples/with-field.vue'

const meta = {
  title: 'Components / TagsInput',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { ControlledExample },
    template: '<ControlledExample />',
  }),
}

export const InitialValue = {
  render: () => ({
    components: { InitialValueExample },
    template: '<InitialValueExample />',
  }),
}

export const MaxWithOverflow = {
  render: () => ({
    components: { MaxWithOverflowExample },
    template: '<MaxWithOverflowExample />',
  }),
}

export const Validated = {
  render: () => ({
    components: { ValidatedExample },
    template: '<ValidatedExample />',
  }),
}

export const BlurBehavior = {
  render: () => ({
    components: { BlurBehaviorExample },
    template: '<BlurBehaviorExample />',
  }),
}

export const PasteBehavior = {
  render: () => ({
    components: { PasteBehaviorExample },
    template: '<PasteBehaviorExample />',
  }),
}

export const DisabledEditing = {
  render: () => ({
    components: { DisabledEditingExample },
    template: '<DisabledEditingExample />',
  }),
}

export const OnEvent = {
  render: () => ({
    components: { OnEventExample },
    template: '<OnEventExample />',
  }),
}

export const WithField = {
  render: () => ({
    components: { WithFieldExample },
    template: '<WithFieldExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}