import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { TagsInputAllowDuplicatesExample } from './examples/allow-duplicates'
import { TagsInputBasicExample } from './examples/basic'
import { TagsInputBlurBehaviorExample } from './examples/blur-behavior'
import { TagsInputControlledInputValueExample } from './examples/controlled-input-value'
import { TagsInputControlledExample } from './examples/controlled'
import { TagsInputDelimiterExample } from './examples/delimiter'
import { TagsInputDisabledEditingExample } from './examples/disabled-editing'
import { TagsInputDisabledExample } from './examples/disabled'
import { TagsInputInvalidExample } from './examples/invalid'
import { TagsInputMaxTagLengthExample } from './examples/max-tag-length'
import { TagsInputMaxWithOverflowExample } from './examples/max-with-overflow'
import { TagsInputPasteBehaviorExample } from './examples/paste-behavior'
import { TagsInputProgrammaticControlExample } from './examples/programmatic-control'
import { TagsInputReadonlyExample } from './examples/readonly'
import { TagsInputRootProviderExample } from './examples/root-provider'
import { TagsInputSanitizeValueExample } from './examples/sanitize-value'
import { TagsInputValidationExample } from './examples/validation'
import { TagsInputWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / Tags Input',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputBasicExample] })],
  render: () => ({ template: '<tags-input-basic-example />' }),
}

export const AllowDuplicates: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputAllowDuplicatesExample] })],
  render: () => ({ template: '<tags-input-allow-duplicates-example />' }),
}

export const BlurBehavior: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputBlurBehaviorExample] })],
  render: () => ({ template: '<tags-input-blur-behavior-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputControlledExample] })],
  render: () => ({ template: '<tags-input-controlled-example />' }),
}

export const ControlledInputValue: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputControlledInputValueExample] })],
  render: () => ({ template: '<tags-input-controlled-input-value-example />' }),
}

export const Delimiter: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputDelimiterExample] })],
  render: () => ({ template: '<tags-input-delimiter-example />' }),
}

export const Disabled: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputDisabledExample] })],
  render: () => ({ template: '<tags-input-disabled-example />' }),
}

export const DisabledEditing: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputDisabledEditingExample] })],
  render: () => ({ template: '<tags-input-disabled-editing-example />' }),
}

export const Invalid: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputInvalidExample] })],
  render: () => ({ template: '<tags-input-invalid-example />' }),
}

export const MaxTagLength: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputMaxTagLengthExample] })],
  render: () => ({ template: '<tags-input-max-tag-length-example />' }),
}

export const MaxWithOverflow: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputMaxWithOverflowExample] })],
  render: () => ({ template: '<tags-input-max-with-overflow-example />' }),
}

export const PasteBehavior: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputPasteBehaviorExample] })],
  render: () => ({ template: '<tags-input-paste-behavior-example />' }),
}

export const ProgrammaticControl: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputProgrammaticControlExample] })],
  render: () => ({ template: '<tags-input-programmatic-control-example />' }),
}

export const Readonly: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputReadonlyExample] })],
  render: () => ({ template: '<tags-input-readonly-example />' }),
}

export const SanitizeValue: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputSanitizeValueExample] })],
  render: () => ({ template: '<tags-input-sanitize-value-example />' }),
}

export const Validation: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputValidationExample] })],
  render: () => ({ template: '<tags-input-validation-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputWithFieldExample] })],
  render: () => ({ template: '<tags-input-with-field-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputRootProviderExample] })],
  render: () => ({ template: '<tags-input-root-provider-example />' }),
}
