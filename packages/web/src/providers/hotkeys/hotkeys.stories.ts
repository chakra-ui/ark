import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as CommandPaletteExample } from './examples/command-palette.js'
import { mount as ConflictsExample } from './examples/conflicts.js'
import { mount as FormFieldsExample } from './examples/form-fields.js'
import { mount as KeyStateExample } from './examples/key-state.js'
import { mount as MultipleExample } from './examples/multiple.js'
import { mount as RecorderExample } from './examples/recorder.js'
import { mount as ScopesExample } from './examples/scopes.js'
import { mount as SequenceExample } from './examples/sequence.js'
import { mount as SequenceTimeoutExample } from './examples/sequence-timeout.js'

const meta: Meta = { title: 'Utilities / Hotkeys' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Multiple: StoryObj = { name: 'Multiple', render: renderExample(MultipleExample) }

export const Sequence: StoryObj = { name: 'Sequence', render: renderExample(SequenceExample) }

export const Scopes: StoryObj = { name: 'Scopes', render: renderExample(ScopesExample) }

export const KeyState: StoryObj = { name: 'Key State', render: renderExample(KeyStateExample) }

export const Recorder: StoryObj = { name: 'Recorder', render: renderExample(RecorderExample) }

export const FormFields: StoryObj = { name: 'Form Fields', render: renderExample(FormFieldsExample) }

export const SequenceTimeout: StoryObj = { name: 'Sequence Timeout', render: renderExample(SequenceTimeoutExample) }

export const Conflicts: StoryObj = { name: 'Conflicts', render: renderExample(ConflictsExample) }

export const CommandPalette: StoryObj = { name: 'Command Palette', render: renderExample(CommandPaletteExample) }
