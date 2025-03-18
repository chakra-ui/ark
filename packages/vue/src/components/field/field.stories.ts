import type { Meta } from '@storybook/vue3'

import DisabledExample from './examples/disabled.vue'
import InputControlledExample from './examples/input-controlled.vue'
import InputExample from './examples/input.vue'
import ReactiveInvalidExample from './examples/reactive-invalid.vue'
import RequiredIndicatorExample from './examples/required-indicator.vue'
import RootProviderExample from './examples/root-provider.vue'
import SelectControlledExample from './examples/select-controlled.vue'
import SelectExample from './examples/select.vue'
import TextareaControlledExample from './examples/textarea-controlled.vue'
import TextareaExample from './examples/textarea.vue'

const meta = {
  title: 'Components / Field',
} as Meta

export default meta

export const Input = {
  render: () => ({
    components: { InputExample },
    template: '<InputExample />',
  }),
}

export const InputControlled = {
  render: () => ({
    components: { InputControlledExample },
    template: '<InputControlledExample />',
  }),
}

export const Select = {
  render: () => ({
    components: { SelectExample }, 
    template: '<SelectExample />',
  }),
}

export const SelectControlled = {
  render: () => ({
    components: { SelectControlledExample },
    template: '<SelectControlledExample />',
  }),
}

export const Disabled = {
  render: () => ({
    components: { DisabledExample },
    template: '<DisabledExample />',
  }),
}

export const Textarea = {
  render: () => ({
    components: { TextareaExample },
    template: '<TextareaExample />',
  }),
}

export const TextareaControlled = {
  render: () => ({
    components: { TextareaControlledExample },
    template: '<TextareaControlledExample />',
  }),
}

export const RequiredIndicator = {
  render: () => ({
    components: { RequiredIndicatorExample },
    template: '<RequiredIndicatorExample />',
  }),
}

export const ReactiveInvalid = {
  render: () => ({
    components: { ReactiveInvalidExample },
    template: '<ReactiveInvalidExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}