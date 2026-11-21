import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/color-picker/basic.js'
import { mount as ControlledExample } from '../../../examples/color-picker/controlled.js'
import { mount as DisabledExample } from '../../../examples/color-picker/disabled.js'
import { mount as FormUsageExample } from '../../../examples/color-picker/form-usage.js'
import { mount as InlineExample } from '../../../examples/color-picker/inline.js'
import { mount as InputOnlyExample } from '../../../examples/color-picker/input-only.js'
import { mount as OpenControlledExample } from '../../../examples/color-picker/open-controlled.js'
import { mount as SliderOnlyExample } from '../../../examples/color-picker/slider-only.js'
import { mount as SwatchOnlyExample } from '../../../examples/color-picker/swatch-only.js'
import { mount as SwatchesExample } from '../../../examples/color-picker/swatches.js'
import { mount as ValueSwatchExample } from '../../../examples/color-picker/value-swatch.js'
import { mount as WithFieldExample } from '../../../examples/color-picker/with-field.js'

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
