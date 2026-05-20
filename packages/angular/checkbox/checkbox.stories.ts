import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { CheckboxBasicExample } from './examples/basic'
import { CheckboxContextExample } from './examples/context'
import { CheckboxControlledExample } from './examples/controlled'
import { CheckboxDefaultCheckedExample } from './examples/default-checked'
import { CheckboxDisabledExample } from './examples/disabled'
import { CheckboxGroupExample } from './examples/group'
import { CheckboxGroupControlledExample } from './examples/group-controlled'
import { CheckboxGroupProviderExample } from './examples/group-provider'
import { CheckboxGroupWithFieldsetExample } from './examples/group-with-fieldset'
import { CheckboxGroupWithFormExample } from './examples/group-with-form'
import { CheckboxGroupWithInvalidExample } from './examples/group-with-invalid'
import { CheckboxGroupWithMaxSelectedExample } from './examples/group-with-max-selected'
import { CheckboxGroupWithSelectAllExample } from './examples/group-with-select-all'
import { CheckboxIndeterminateExample } from './examples/indeterminate'
import { CheckboxRootProviderExample } from './examples/root-provider'
import { CheckboxWithFieldExample } from './examples/with-field'
import { CheckboxWithFormExample } from './examples/with-form'

const meta: Meta = {
  title: 'Components / Checkbox',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxBasicExample] })],
  render: () => ({ template: '<checkbox-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxControlledExample] })],
  render: () => ({ template: '<checkbox-controlled-example />' }),
}

export const DefaultChecked: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxDefaultCheckedExample] })],
  render: () => ({ template: '<checkbox-default-checked-example />' }),
}

export const Disabled: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxDisabledExample] })],
  render: () => ({ template: '<checkbox-disabled-example />' }),
}

export const Group: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxGroupExample] })],
  render: () => ({ template: '<checkbox-group-example />' }),
}

export const GroupControlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxGroupControlledExample] })],
  render: () => ({ template: '<checkbox-group-controlled-example />' }),
}

export const GroupProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxGroupProviderExample] })],
  render: () => ({ template: '<checkbox-group-provider-example />' }),
}

export const GroupWithForm: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxGroupWithFormExample] })],
  render: () => ({ template: '<checkbox-group-with-form-example />' }),
}

export const GroupWithInvalid: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxGroupWithInvalidExample] })],
  render: () => ({ template: '<checkbox-group-with-invalid-example />' }),
}

export const GroupWithMaxSelected: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxGroupWithMaxSelectedExample] })],
  render: () => ({ template: '<checkbox-group-with-max-selected-example />' }),
}

export const GroupWithSelectAll: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxGroupWithSelectAllExample] })],
  render: () => ({ template: '<checkbox-group-with-select-all-example />' }),
}

export const Indeterminate: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxIndeterminateExample] })],
  render: () => ({ template: '<checkbox-indeterminate-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxContextExample] })],
  render: () => ({ template: '<checkbox-context-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxRootProviderExample] })],
  render: () => ({ template: '<checkbox-root-provider-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxWithFieldExample] })],
  render: () => ({ template: '<checkbox-with-field-example />' }),
}

export const GroupWithFieldset: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxGroupWithFieldsetExample] })],
  render: () => ({ template: '<checkbox-group-with-fieldset-example />' }),
}

export const WithForm: StoryObj = {
  decorators: [moduleMetadata({ imports: [CheckboxWithFormExample] })],
  render: () => ({ template: '<checkbox-with-form-example />' }),
}
