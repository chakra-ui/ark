import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/fieldset/basic.js'
import { mount as DisabledExample } from '../../../examples/fieldset/disabled.js'
import { mount as InvalidExample } from '../../../examples/fieldset/invalid.js'
import { mount as WithCheckboxExample } from '../../../examples/fieldset/with-checkbox.js'
import { mount as WithFieldExample } from '../../../examples/fieldset/with-field.js'

const meta: Meta = { title: 'Components / Fieldset' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const Invalid: StoryObj = { name: 'Invalid', render: renderExample(InvalidExample) }

export const WithCheckbox: StoryObj = { name: 'With Checkbox', render: renderExample(WithCheckboxExample) }

export const WithField: StoryObj = { name: 'With Field', render: renderExample(WithFieldExample) }
