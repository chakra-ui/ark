import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import StepExample from './examples/step.svelte'

const meta = {
  title: 'Components / Angle Slider',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Step = {
  render: () => ({
    Component: StepExample,
  }),
}
