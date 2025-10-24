import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'

const meta: Meta = {
  title: 'Components / Image Cropper',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}
