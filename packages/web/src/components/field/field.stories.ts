import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as InputExample } from './examples/input.js'
import { mount as DisabledExample } from './examples/disabled.js'
import { mount as InvalidExample } from './examples/invalid.js'
import { mount as ItemExample } from './examples/item.js'
import { mount as IndicatorExample } from './examples/indicator.js'
import { mount as ValidationExample } from './examples/validation.js'
import { mount as CustomValidationExample } from './examples/custom-validation.js'
import { mount as ServerErrorsExample } from './examples/server-errors.js'
import { mount as SelectExample } from './examples/select.js'
import { mount as TextareaExample } from './examples/textarea.js'
import { mount as TextareaAutoresizeExample } from './examples/textarea-autoresize.js'
import { mount as ShadowRootExample } from './examples/shadow-root.js'

const meta: Meta = { title: 'Components / Field' }
export default meta

export const Input: StoryObj = { name: 'Input', render: renderExample(InputExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const Invalid: StoryObj = { name: 'Invalid', render: renderExample(InvalidExample) }

export const Item: StoryObj = { name: 'Item', render: renderExample(ItemExample) }

export const Indicator: StoryObj = { name: 'Indicator', render: renderExample(IndicatorExample) }

export const Validation: StoryObj = { name: 'Validation', render: renderExample(ValidationExample) }

export const CustomValidation: StoryObj = { name: 'Custom Validation', render: renderExample(CustomValidationExample) }

export const ServerErrors: StoryObj = { name: 'Server Errors', render: renderExample(ServerErrorsExample) }

export const Select: StoryObj = { name: 'Select', render: renderExample(SelectExample) }

export const Textarea: StoryObj = { name: 'Textarea', render: renderExample(TextareaExample) }

export const TextareaAutoresize: StoryObj = {
  name: 'Textarea Autoresize',
  render: renderExample(TextareaAutoresizeExample),
}

export const ShadowRoot: StoryObj = { name: 'Shadow Root', render: renderExample(ShadowRootExample) }
