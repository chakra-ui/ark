import type { Meta } from '@storybook/vue3'

import ActionExample from './examples/action.vue'
import BasicExample from './examples/basic.vue'
import UpdateExample from './examples/update.vue'

const meta = {
  title: 'Components / Toast',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Action = {
  render: () => ({
    components: { ActionExample },
    template: '<ActionExample />',
  }),
}

export const Update = {
  render: () => ({
    components: { UpdateExample },
    template: '<UpdateExample />',
  }),
}
