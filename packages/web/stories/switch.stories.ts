import { renderExample } from '../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../examples/switch/basic.js'
import { mount as ControlledExample } from '../examples/switch/controlled.js'
import { mount as DisabledExample } from '../examples/switch/disabled.js'
import { mount as InitialCheckedExample } from '../examples/switch/initial-checked.js'
import { mount as WithFieldExample } from '../examples/switch/with-field.js'

const meta: Meta = { title: 'Components / Switch' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const InitialChecked: StoryObj = { name: 'Initial Checked', render: renderExample(InitialCheckedExample) }

export const WithField: StoryObj = { name: 'With Field', render: renderExample(WithFieldExample) }
