import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/progress/linear/basic.js'
import { mount as ControlledExample } from '../../../examples/progress/linear/controlled.js'
import { mount as IndeterminateExample } from '../../../examples/progress/linear/indeterminate.js'
import { mount as InitialValueExample } from '../../../examples/progress/linear/initial-value.js'
import { mount as MinMaxExample } from '../../../examples/progress/linear/min-max.js'
import { mount as ValueTextExample } from '../../../examples/progress/linear/value-text.js'
import { mount as VerticalExample } from '../../../examples/progress/linear/vertical.js'

const meta: Meta = { title: 'Components / Progress - Linear' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Indeterminate: StoryObj = { name: 'Indeterminate', render: renderExample(IndeterminateExample) }

export const InitialValue: StoryObj = { name: 'Initial Value', render: renderExample(InitialValueExample) }

export const MinMax: StoryObj = { name: 'Min Max', render: renderExample(MinMaxExample) }

export const ValueText: StoryObj = { name: 'Value Text', render: renderExample(ValueTextExample) }

export const Vertical: StoryObj = { name: 'Vertical', render: renderExample(VerticalExample) }
