import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/meter/basic.js'
import { mount as BatteryExample } from '../../../examples/meter/battery.js'
import { mount as FormatOptionsExample } from '../../../examples/meter/format-options.js'
import { mount as MinMaxExample } from '../../../examples/meter/min-max.js'
import { mount as PasswordStrengthExample } from '../../../examples/meter/password-strength.js'
import { mount as ValueStateExample } from '../../../examples/meter/value-state.js'
import { mount as ValueTextExample } from '../../../examples/meter/value-text.js'
import { mount as VerticalExample } from '../../../examples/meter/vertical.js'

const meta: Meta = { title: 'Components / Meter' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const MinMax: StoryObj = { name: 'Min Max', render: renderExample(MinMaxExample) }

export const FormatOptions: StoryObj = { name: 'Format Options', render: renderExample(FormatOptionsExample) }

export const ValueText: StoryObj = { name: 'Value Text', render: renderExample(ValueTextExample) }

export const ValueState: StoryObj = { name: 'Value State', render: renderExample(ValueStateExample) }

export const Vertical: StoryObj = { name: 'Vertical', render: renderExample(VerticalExample) }

export const Battery: StoryObj = { name: 'Battery', render: renderExample(BatteryExample) }

export const PasswordStrength: StoryObj = { name: 'Password Strength', render: renderExample(PasswordStrengthExample) }
