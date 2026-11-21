import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/tags-input/basic.js'
import { mount as AllowDuplicatesExample } from '../../../examples/tags-input/allow-duplicates.js'
import { mount as BlurBehaviorExample } from '../../../examples/tags-input/blur-behavior.js'
import { mount as ControlledExample } from '../../../examples/tags-input/controlled.js'
import { mount as ControlledInputValueExample } from '../../../examples/tags-input/controlled-input-value.js'
import { mount as DelimiterExample } from '../../../examples/tags-input/delimiter.js'
import { mount as DisabledExample } from '../../../examples/tags-input/disabled.js'
import { mount as DisabledEditingExample } from '../../../examples/tags-input/disabled-editing.js'
import { mount as InvalidExample } from '../../../examples/tags-input/invalid.js'
import { mount as MaxTagLengthExample } from '../../../examples/tags-input/max-tag-length.js'
import { mount as MaxWithOverflowExample } from '../../../examples/tags-input/max-with-overflow.js'
import { mount as PasteBehaviorExample } from '../../../examples/tags-input/paste-behavior.js'
import { mount as ProgrammaticControlExample } from '../../../examples/tags-input/programmatic-control.js'
import { mount as ReadonlyExample } from '../../../examples/tags-input/readonly.js'
import { mount as SanitizeValueExample } from '../../../examples/tags-input/sanitize-value.js'
import { mount as ValidationExample } from '../../../examples/tags-input/validation.js'

const meta: Meta = { title: 'Components / Tags Input' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const AllowDuplicates: StoryObj = { name: 'Allow Duplicates', render: renderExample(AllowDuplicatesExample) }

export const BlurBehavior: StoryObj = { name: 'Blur Behavior', render: renderExample(BlurBehaviorExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const ControlledInputValue: StoryObj = {
  name: 'Controlled Input Value',
  render: renderExample(ControlledInputValueExample),
}

export const Delimiter: StoryObj = { name: 'Delimiter', render: renderExample(DelimiterExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const DisabledEditing: StoryObj = { name: 'Disabled Editing', render: renderExample(DisabledEditingExample) }

export const Invalid: StoryObj = { name: 'Invalid', render: renderExample(InvalidExample) }

export const MaxTagLength: StoryObj = { name: 'Max Tag Length', render: renderExample(MaxTagLengthExample) }

export const MaxWithOverflow: StoryObj = { name: 'Max With Overflow', render: renderExample(MaxWithOverflowExample) }

export const PasteBehavior: StoryObj = { name: 'Paste Behavior', render: renderExample(PasteBehaviorExample) }

export const ProgrammaticControl: StoryObj = {
  name: 'Programmatic Control',
  render: renderExample(ProgrammaticControlExample),
}

export const Readonly: StoryObj = { name: 'Readonly', render: renderExample(ReadonlyExample) }

export const SanitizeValue: StoryObj = { name: 'Sanitize Value', render: renderExample(SanitizeValueExample) }

export const Validation: StoryObj = { name: 'Validation', render: renderExample(ValidationExample) }
