import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DisabledExample from './examples/disabled.vue'
import FormUsageExample from './examples/form-usage.vue'
import HalfRatingsExample from './examples/half-ratings.vue'
import InitialValueExample from './examples/initial-value.vue'
import ReadonlyExample from './examples/read-only.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithFieldExample from './examples/with-field.vue'

const meta: Meta = {
  title: 'Components / RatingGroup',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const Disabled = {
  render: () => ({
    components: { Component: DisabledExample },
    template: '<Component />',
  }),
}

export const FormUsage = {
  render: () => ({
    components: { Component: FormUsageExample },
    template: '<Component />',
  }),
}

export const HalfRatings = {
  render: () => ({
    components: { Component: HalfRatingsExample },
    template: '<Component />',
  }),
}

export const InitialValue = {
  render: () => ({
    components: { Component: InitialValueExample },
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

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}
