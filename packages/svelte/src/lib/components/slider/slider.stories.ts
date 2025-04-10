import type { Meta, StoryObj } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import CenterOriginExample from './examples/center-origin.svelte'
import DraggingIndicatorExample from './examples/dragging-indicator.svelte'
import InitialValueExample from './examples/initial-value.svelte'
import MinMaxExample from './examples/min-max.svelte'
import OnEventExample from './examples/on-event.svelte'
import RangeExample from './examples/range.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import StepExample from './examples/step.svelte'
import ThumbOverlapExample from './examples/thumb-overlap.svelte'
import VerticalExample from './examples/vertical.svelte'
import WithMarksExample from './examples/with-marks.svelte'

const meta = {
  title: 'Components/Slider',
  component: BasicExample,
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const CenterOrigin: Story = {
  render: () => ({
    Component: CenterOriginExample,
  }),
}

export const DraggingIndicator: Story = {
  render: () => ({
    Component: DraggingIndicatorExample,
  }),
}

export const InitialValue: Story = {
  render: () => ({
    Component: InitialValueExample,
  }),
}

export const MinMax: Story = {
  render: () => ({
    Component: MinMaxExample,
  }),
}

export const OnEvent: Story = {
  render: () => ({
    Component: OnEventExample,
  }),
}

export const Range: Story = {
  render: () => ({
    Component: RangeExample,
  }),
}

export const RootProvider: Story = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const Step: Story = {
  render: () => ({
    Component: StepExample,
  }),
}

export const ThumbOverlap: Story = {
  render: () => ({
    Component: ThumbOverlapExample,
  }),
}

export const Vertical: Story = {
  render: () => ({
    Component: VerticalExample,
  }),
}

export const WithMarks: Story = {
  render: () => ({
    Component: WithMarksExample,
  }),
}
