import { mount as AccessibleLabelsExample } from '../../../examples/slider/accessible-labels.js'
import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/slider/basic.js'
import { mount as CenterOriginExample } from '../../../examples/slider/center-origin.js'
import { mount as DraggingIndicatorExample } from '../../../examples/slider/dragging-indicator.js'
import { mount as MinMaxExample } from '../../../examples/slider/min-max.js'
import { mount as OnEventExample } from '../../../examples/slider/on-event.js'
import { mount as RangeExample } from '../../../examples/slider/range.js'
import { mount as StepExample } from '../../../examples/slider/step.js'
import { mount as ThumbAlignmentExample } from '../../../examples/slider/thumb-alignment.js'
import { mount as ThumbCollisionExample } from '../../../examples/slider/thumb-collision.js'
import { mount as ThumbOverlapExample } from '../../../examples/slider/thumb-overlap.js'
import { mount as VerticalExample } from '../../../examples/slider/vertical.js'
import { mount as WithMarksExample } from '../../../examples/slider/with-marks.js'

const meta: Meta = { title: 'Components / Slider' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const CenterOrigin: StoryObj = { name: 'Center Origin', render: renderExample(CenterOriginExample) }

export const DraggingIndicator: StoryObj = {
  name: 'Dragging Indicator',
  render: renderExample(DraggingIndicatorExample),
}

export const MinMax: StoryObj = { name: 'Min Max', render: renderExample(MinMaxExample) }

export const OnEvent: StoryObj = { name: 'On Event', render: renderExample(OnEventExample) }

export const Range: StoryObj = { name: 'Range', render: renderExample(RangeExample) }

export const Step: StoryObj = { name: 'Step', render: renderExample(StepExample) }

export const ThumbAlignment: StoryObj = { name: 'Thumb Alignment', render: renderExample(ThumbAlignmentExample) }

export const ThumbCollision: StoryObj = { name: 'Thumb Collision', render: renderExample(ThumbCollisionExample) }

export const ThumbOverlap: StoryObj = { name: 'Thumb Overlap', render: renderExample(ThumbOverlapExample) }

export const Vertical: StoryObj = { name: 'Vertical', render: renderExample(VerticalExample) }

export const WithMarks: StoryObj = { name: 'With Marks', render: renderExample(WithMarksExample) }

export const AccessibleLabels: StoryObj = { name: 'Accessible Labels', render: renderExample(AccessibleLabelsExample) }
