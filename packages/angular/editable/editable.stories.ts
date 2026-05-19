import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { EditableBasicExample } from './examples/basic'
import { EditableControlledExample } from './examples/controlled'
import { EditableRootProviderExample } from './examples/root-provider'
import { EditableWithFieldValidationExample } from './examples/with-field-validation'
import { EditableWithTriggerExample } from './examples/with-trigger'

const meta: Meta = {
  title: 'Components / Editable',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [EditableBasicExample] })],
  render: () => ({ template: '<editable-basic-example />' }),
}

export const WithTrigger: StoryObj = {
  decorators: [moduleMetadata({ imports: [EditableWithTriggerExample] })],
  render: () => ({ template: '<editable-with-trigger-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [EditableControlledExample] })],
  render: () => ({ template: '<editable-controlled-example />' }),
}

export const WithFieldValidation: StoryObj = {
  decorators: [moduleMetadata({ imports: [EditableWithFieldValidationExample] })],
  render: () => ({ template: '<editable-with-field-validation-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [EditableRootProviderExample] })],
  render: () => ({ template: '<editable-root-provider-example />' }),
}
