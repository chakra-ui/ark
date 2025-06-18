import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import SvgExample from './examples/svg.vue'
import WithPromiseExample from './examples/with-promise.vue'

const meta = {
  title: 'Components / Download Trigger',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Svg = {
  render: () => ({
    components: { SvgExample },
    template: '<SvgExample />',
  }),
}

export const WithPromise = {
  render: () => ({
    components: { WithPromiseExample },
    template: '<WithPromiseExample />',
  }),
}
