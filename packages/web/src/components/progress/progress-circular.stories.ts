import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/circular/basic.js'
import { mount as ControlledExample } from './examples/circular/controlled.js'
import { mount as IndeterminateExample } from './examples/circular/indeterminate.js'
import { mount as InitialValueExample } from './examples/circular/initial-value.js'
import { mount as MinMaxExample } from './examples/circular/min-max.js'
import { mount as WithLabelExample } from './examples/circular/with-label.js'

const meta: Meta = { title: 'Components / Progress - Circular' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Indeterminate: StoryObj = { name: 'Indeterminate', render: renderExample(IndeterminateExample) }

export const InitialValue: StoryObj = { name: 'Initial Value', render: renderExample(InitialValueExample) }

export const MinMax: StoryObj = { name: 'Min Max', render: renderExample(MinMaxExample) }

export const WithLabel: StoryObj = { name: 'With Label', render: renderExample(WithLabelExample) }
