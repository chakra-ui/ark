import { renderExample } from '../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../examples/number-input/basic.js'
import { mount as FormattingExample } from '../examples/number-input/formatting.js'
import { mount as FractionDigitsExample } from '../examples/number-input/fraction-digits.js'
import { mount as MinMaxExample } from '../examples/number-input/min-max.js'
import { mount as MouseWheelExample } from '../examples/number-input/mouse-wheel.js'
import { mount as ScrubberExample } from '../examples/number-input/scrubber.js'

const meta: Meta = { title: 'Components / Number Input' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Formatting: StoryObj = { name: 'Formatting', render: renderExample(FormattingExample) }

export const FractionDigits: StoryObj = { name: 'Fraction Digits', render: renderExample(FractionDigitsExample) }

export const MinMax: StoryObj = { name: 'Min Max', render: renderExample(MinMaxExample) }

export const MouseWheel: StoryObj = { name: 'Mouse Wheel', render: renderExample(MouseWheelExample) }

export const Scrubber: StoryObj = { name: 'Scrubber', render: renderExample(ScrubberExample) }
