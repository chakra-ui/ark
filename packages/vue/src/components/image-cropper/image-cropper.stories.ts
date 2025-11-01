import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'

const meta: Meta = {
  title: 'Components / Image Cropper',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}
