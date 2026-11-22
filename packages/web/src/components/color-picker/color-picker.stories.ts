import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as ControlledExample } from './examples/controlled.js'
import { mount as DisabledExample } from './examples/disabled.js'
import { mount as FormUsageExample } from './examples/form-usage.js'
import { mount as InlineExample } from './examples/inline.js'
import { mount as InputOnlyExample } from './examples/input-only.js'
import { mount as OpenControlledExample } from './examples/open-controlled.js'
import { mount as SliderOnlyExample } from './examples/slider-only.js'
import { mount as SwatchOnlyExample } from './examples/swatch-only.js'
import { mount as SwatchesExample } from './examples/swatches.js'
import { mount as ValueSwatchExample } from './examples/value-swatch.js'
import { mount as WithFieldExample } from './examples/with-field.js'

const meta: Meta = { title: 'Components / Color Picker' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const FormUsage: StoryObj = { name: 'Form Usage', render: renderExample(FormUsageExample) }

export const Inline: StoryObj = { name: 'Inline', render: renderExample(InlineExample) }

export const InputOnly: StoryObj = { name: 'Input Only', render: renderExample(InputOnlyExample) }

export const OpenControlled: StoryObj = { name: 'Open Controlled', render: renderExample(OpenControlledExample) }

export const SliderOnly: StoryObj = { name: 'Slider Only', render: renderExample(SliderOnlyExample) }

export const SwatchOnly: StoryObj = { name: 'Swatch Only', render: renderExample(SwatchOnlyExample) }

export const Swatches: StoryObj = { name: 'Swatches', render: renderExample(SwatchesExample) }

export const ValueSwatch: StoryObj = { name: 'Value Swatch', render: renderExample(ValueSwatchExample) }

export const WithField: StoryObj = { name: 'With Field', render: renderExample(WithFieldExample) }
