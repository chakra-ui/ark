import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { EditableBasicExample } from './examples/basic'
import { EditableContextExample } from './examples/context'
import { EditableControlledExample } from './examples/controlled'
import { EditableControlsExample } from './examples/controls'
import { EditableDoubleClickExample } from './examples/double-click'
import { EditableRootProviderExample } from './examples/root-provider'
import { EditableTextareaExample } from './examples/textarea'
import { EditableWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / Editable',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [EditableBasicExample] })],
  render: () => ({ template: '<editable-basic-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [EditableContextExample] })],
  render: () => ({ template: '<editable-context-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [EditableControlledExample] })],
  render: () => ({ template: '<editable-controlled-example />' }),
}

export const Controls: StoryObj = {
  decorators: [moduleMetadata({ imports: [EditableControlsExample] })],
  render: () => ({ template: '<editable-controls-example />' }),
}

export const DoubleClick: StoryObj = {
  decorators: [moduleMetadata({ imports: [EditableDoubleClickExample] })],
  render: () => ({ template: '<editable-double-click-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [EditableRootProviderExample] })],
  render: () => ({ template: '<editable-root-provider-example />' }),
}

export const Textarea: StoryObj = {
  decorators: [moduleMetadata({ imports: [EditableTextareaExample] })],
  render: () => ({ template: '<editable-textarea-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [EditableWithFieldExample] })],
  render: () => ({ template: '<editable-with-field-example />' }),
}
