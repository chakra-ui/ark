import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as InputExample } from '../../../examples/field/input.js'
import { mount as DisabledExample } from '../../../examples/field/disabled.js'
import { mount as InvalidExample } from '../../../examples/field/invalid.js'
import { mount as ItemExample } from '../../../examples/field/item.js'
import { mount as RequiredIndicatorExample } from '../../../examples/field/required-indicator.js'
import { mount as SelectExample } from '../../../examples/field/select.js'
import { mount as TextareaExample } from '../../../examples/field/textarea.js'
import { mount as TextareaAutoresizeExample } from '../../../examples/field/textarea-autoresize.js'
import { mount as ShadowRootExample } from '../../../examples/field/shadow-root.js'

const meta: Meta = { title: 'Components / Field' }
export default meta

export const Input: StoryObj = { name: 'Input', render: renderExample(InputExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const Invalid: StoryObj = { name: 'Invalid', render: renderExample(InvalidExample) }

export const Item: StoryObj = { name: 'Item', render: renderExample(ItemExample) }

export const RequiredIndicator: StoryObj = {
  name: 'Required Indicator',
  render: renderExample(RequiredIndicatorExample),
}

export const Select: StoryObj = { name: 'Select', render: renderExample(SelectExample) }

export const Textarea: StoryObj = { name: 'Textarea', render: renderExample(TextareaExample) }

export const TextareaAutoresize: StoryObj = {
  name: 'Textarea Autoresize',
  render: renderExample(TextareaAutoresizeExample),
}

export const ShadowRoot: StoryObj = { name: 'Shadow Root', render: renderExample(ShadowRootExample) }
