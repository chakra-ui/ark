import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import CircleExample from './examples/circle.svelte'
import ControlledExample from './examples/controlled.svelte'
import FixedExample from './examples/fixed.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components / Image Cropper',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Circle = {
  render: () => ({
    Component: CircleExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Fixed = {
  render: () => ({
    Component: FixedExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
