import { renderExample } from '../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../examples/accordion/basic.js'
import { mount as CollapsibleExample } from '../examples/accordion/collapsible.js'
import { mount as ControlledExample } from '../examples/accordion/controlled.js'
import { mount as DisabledExample } from '../examples/accordion/disabled.js'
import { mount as HorizontalExample } from '../examples/accordion/horizontal.js'
import { mount as LazyMountExample } from '../examples/accordion/lazy-mount.js'
import { mount as MultipleExample } from '../examples/accordion/multiple.js'
import { mount as ValueChangeExample } from '../examples/accordion/value-change.js'
import { mount as WithSliderExample } from '../examples/accordion/with-slider.js'

const meta: Meta = { title: 'Components / Accordion' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Collapsible: StoryObj = { name: 'Collapsible', render: renderExample(CollapsibleExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const Horizontal: StoryObj = { name: 'Horizontal', render: renderExample(HorizontalExample) }

export const LazyMount: StoryObj = { name: 'Lazy Mount', render: renderExample(LazyMountExample) }

export const Multiple: StoryObj = { name: 'Multiple', render: renderExample(MultipleExample) }

export const ValueChange: StoryObj = { name: 'Value Change', render: renderExample(ValueChangeExample) }

export const WithSlider: StoryObj = { name: 'With Slider', render: renderExample(WithSliderExample) }
