import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'

const meta = {
  title: 'Components / TreeView',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}