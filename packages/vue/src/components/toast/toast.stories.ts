import type { Meta } from '@storybook/vue3-vite'

import ActionExample from './examples/action.vue'
import BasicExample from './examples/basic.vue'
import DurationExample from './examples/duration.vue'
import MaxToastsExample from './examples/max-toasts.vue'
import PromiseToastExample from './examples/promise-toast.vue'
import TypesExample from './examples/types.vue'
import UpdateExample from './examples/update.vue'

const meta: Meta = {
  title: 'Components / Toast',
}

export default meta

export const Action = {
  render: () => ({
    components: { Component: ActionExample },
    template: '<Component />',
  }),
}

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Duration = {
  render: () => ({
    components: { Component: DurationExample },
    template: '<Component />',
  }),
}

export const MaxToasts = {
  render: () => ({
    components: { Component: MaxToastsExample },
    template: '<Component />',
  }),
}

export const PromiseToast = {
  render: () => ({
    components: { Component: PromiseToastExample },
    template: '<Component />',
  }),
}

export const Types = {
  render: () => ({
    components: { Component: TypesExample },
    template: '<Component />',
  }),
}

export const Update = {
  render: () => ({
    components: { Component: UpdateExample },
    template: '<Component />',
  }),
}
