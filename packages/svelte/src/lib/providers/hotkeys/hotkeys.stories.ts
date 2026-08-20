import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ConflictsExample from './examples/conflicts.svelte'
import FormFieldsExample from './examples/form-fields.svelte'
import KeyStateExample from './examples/key-state.svelte'
import MultipleExample from './examples/multiple.svelte'
import RecorderExample from './examples/recorder.svelte'
import ScopesExample from './examples/scopes.svelte'
import SequenceExample from './examples/sequence.svelte'
import SequenceTimeoutExample from './examples/sequence-timeout.svelte'

const meta: Meta = {
  title: 'Utilities / Hotkeys',
}

export default meta

export const Basic = { render: () => ({ Component: BasicExample }) }
export const Multiple = { render: () => ({ Component: MultipleExample }) }
export const Sequence = { render: () => ({ Component: SequenceExample }) }
export const Scopes = { render: () => ({ Component: ScopesExample }) }
export const KeyState = { render: () => ({ Component: KeyStateExample }) }
export const Recorder = { render: () => ({ Component: RecorderExample }) }
export const FormFields = { render: () => ({ Component: FormFieldsExample }) }
export const SequenceTimeout = { render: () => ({ Component: SequenceTimeoutExample }) }
export const Conflicts = { render: () => ({ Component: ConflictsExample }) }
