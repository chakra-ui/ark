import type { Meta } from '@storybook/vue3-vite'

import CustomControlExample from './examples/custom-control.vue'
import DisabledExample from './examples/disabled.vue'
import InputControlledExample from './examples/input-controlled.vue'
import InputExample from './examples/input.vue'
import InvalidExample from './examples/invalid.vue'
import ReactiveInvalidExample from './examples/reactive-invalid.vue'
import RequiredExample from './examples/required.vue'
import RequiredIndicatorExample from './examples/required-indicator.vue'
import RootProviderExample from './examples/root-provider.vue'
import SelectControlledExample from './examples/select-controlled.vue'
import SelectExample from './examples/select.vue'
import TextareaAutoresizeExample from './examples/textarea-autoresize.vue'
import TextareaControlledExample from './examples/textarea-controlled.vue'
import TextareaExample from './examples/textarea.vue'

const meta: Meta = {
  title: 'Components / Field',
}

export default meta

export const CustomControl = {
  render: () => ({
    components: { Component: CustomControlExample },
    template: '<Component />',
  }),
}

export const Disabled = {
  render: () => ({
    components: { Component: DisabledExample },
    template: '<Component />',
  }),
}

export const InputControlled = {
  render: () => ({
    components: { Component: InputControlledExample },
    template: '<Component />',
  }),
}

export const Input = {
  render: () => ({
    components: { Component: InputExample },
    template: '<Component />',
  }),
}

export const Invalid = {
  render: () => ({
    components: { Component: InvalidExample },
    template: '<Component />',
  }),
}

export const ReactiveInvalid = {
  render: () => ({
    components: { Component: ReactiveInvalidExample },
    template: '<Component />',
  }),
}

export const RequiredIndicator = {
  render: () => ({
    components: { Component: RequiredIndicatorExample },
    template: '<Component />',
  }),
}

export const Required = {
  render: () => ({
    components: { Component: RequiredExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const SelectControlled = {
  render: () => ({
    components: { Component: SelectControlledExample },
    template: '<Component />',
  }),
}

export const Select = {
  render: () => ({
    components: { Component: SelectExample },
    template: '<Component />',
  }),
}

export const TextareaAutoresize = {
  render: () => ({
    components: { Component: TextareaAutoresizeExample },
    template: '<Component />',
  }),
}

export const TextareaControlled = {
  render: () => ({
    components: { Component: TextareaControlledExample },
    template: '<Component />',
  }),
}

export const Textarea = {
  render: () => ({
    components: { Component: TextareaExample },
    template: '<Component />',
  }),
}
