import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DisabledExample from './examples/disabled.vue'
import FormUsageExample from './examples/form-usage.vue'
import HalfRatingsExample from './examples/half-ratings.vue'
import InitialValueExample from './examples/initial-value.vue'
import ReadOnlyExample from './examples/read-only.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithFieldExample from './examples/with-field.vue'

const meta = {
  title: 'Components / RatingGroup',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const HalfRatings = {
  render: () => ({
    components: { HalfRatingsExample },
    template: '<HalfRatingsExample />',
  }),
}

export const InitialValue = {
  render: () => ({
    components: { InitialValueExample },
    template: '<InitialValueExample />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { ControlledExample },
    template: '<ControlledExample />',
  }),
}

export const Disabled = {
  render: () => ({
    components: { DisabledExample },
    template: '<DisabledExample />',
  }),
}

export const ReadOnly = {
  render: () => ({
    components: { ReadOnlyExample },
    template: '<ReadOnlyExample />',
  }),
}

export const FormUsage = {
  render: () => ({
    components: { FormUsageExample },
    template: '<FormUsageExample />',
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