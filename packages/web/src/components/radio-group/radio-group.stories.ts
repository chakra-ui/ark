import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/radio-group/basic.js'
import { mount as ControlledExample } from '../../../examples/radio-group/controlled.js'
import { mount as DisabledExample } from '../../../examples/radio-group/disabled.js'
import { mount as InitialValueExample } from '../../../examples/radio-group/initial-value.js'
import { mount as OrientationExample } from '../../../examples/radio-group/orientation.js'
import { mount as WithFieldsetExample } from '../../../examples/radio-group/with-fieldset.js'

const meta: Meta = { title: 'Components / Radio Group' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const InitialValue: StoryObj = { name: 'Initial Value', render: renderExample(InitialValueExample) }

export const Orientation: StoryObj = { name: 'Orientation', render: renderExample(OrientationExample) }

export const WithFieldset: StoryObj = { name: 'With Fieldset', render: renderExample(WithFieldsetExample) }
