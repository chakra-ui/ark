import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { SliderBasicExample } from './examples/basic'
import { SliderCenterOriginExample } from './examples/center-origin'
import { SliderContextExample } from './examples/context'
import { SliderDraggingIndicatorExample } from './examples/dragging-indicator'
import { SliderMinMaxExample } from './examples/min-max'
import { SliderOnEventExample } from './examples/on-event'
import { SliderRangeExample } from './examples/range'
import { SliderRootProviderExample } from './examples/root-provider'
import { SliderStepExample } from './examples/step'
import { SliderThumbAlignmentExample } from './examples/thumb-alignment'
import { SliderThumbCollisionExample } from './examples/thumb-collision'
import { SliderThumbOverlapExample } from './examples/thumb-overlap'
import { SliderVerticalExample } from './examples/vertical'
import { SliderWithMarksExample } from './examples/with-marks'

const meta: Meta = {
  title: 'Components / Slider',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [SliderBasicExample] })],
  render: () => ({ template: '<slider-basic-example />' }),
}

export const CenterOrigin: StoryObj = {
  decorators: [moduleMetadata({ imports: [SliderCenterOriginExample] })],
  render: () => ({ template: '<slider-center-origin-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [SliderContextExample] })],
  render: () => ({ template: '<slider-context-example />' }),
}

export const DraggingIndicator: StoryObj = {
  decorators: [moduleMetadata({ imports: [SliderDraggingIndicatorExample] })],
  render: () => ({ template: '<slider-dragging-indicator-example />' }),
}

export const MinMax: StoryObj = {
  decorators: [moduleMetadata({ imports: [SliderMinMaxExample] })],
  render: () => ({ template: '<slider-min-max-example />' }),
}

export const OnEvent: StoryObj = {
  decorators: [moduleMetadata({ imports: [SliderOnEventExample] })],
  render: () => ({ template: '<slider-on-event-example />' }),
}

export const Range: StoryObj = {
  decorators: [moduleMetadata({ imports: [SliderRangeExample] })],
  render: () => ({ template: '<slider-range-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [SliderRootProviderExample] })],
  render: () => ({ template: '<slider-root-provider-example />' }),
}

export const Step: StoryObj = {
  decorators: [moduleMetadata({ imports: [SliderStepExample] })],
  render: () => ({ template: '<slider-step-example />' }),
}

export const ThumbAlignment: StoryObj = {
  decorators: [moduleMetadata({ imports: [SliderThumbAlignmentExample] })],
  render: () => ({ template: '<slider-thumb-alignment-example />' }),
}

export const ThumbCollision: StoryObj = {
  decorators: [moduleMetadata({ imports: [SliderThumbCollisionExample] })],
  render: () => ({ template: '<slider-thumb-collision-example />' }),
}

export const ThumbOverlap: StoryObj = {
  decorators: [moduleMetadata({ imports: [SliderThumbOverlapExample] })],
  render: () => ({ template: '<slider-thumb-overlap-example />' }),
}

export const Vertical: StoryObj = {
  decorators: [moduleMetadata({ imports: [SliderVerticalExample] })],
  render: () => ({ template: '<slider-vertical-example />' }),
}

export const WithMarks: StoryObj = {
  decorators: [moduleMetadata({ imports: [SliderWithMarksExample] })],
  render: () => ({ template: '<slider-with-marks-example />' }),
}
