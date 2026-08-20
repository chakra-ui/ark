import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ConflictsExample from './examples/conflicts.vue'
import FormFieldsExample from './examples/form-fields.vue'
import KeyStateExample from './examples/key-state.vue'
import MultipleExample from './examples/multiple.vue'
import RecorderExample from './examples/recorder.vue'
import ScopesExample from './examples/scopes.vue'
import SequenceExample from './examples/sequence.vue'
import SequenceTimeoutExample from './examples/sequence-timeout.vue'

const meta: Meta = {
  title: 'Utilities / Hotkeys',
}

export default meta

const story = (Component: unknown) => ({
  render: () => ({ components: { Component }, template: '<Component />' }),
})

export const Basic = story(BasicExample)
export const Multiple = story(MultipleExample)
export const Sequence = story(SequenceExample)
export const Scopes = story(ScopesExample)
export const KeyState = story(KeyStateExample)
export const Recorder = story(RecorderExample)
export const FormFields = story(FormFieldsExample)
export const SequenceTimeout = story(SequenceTimeoutExample)
export const Conflicts = story(ConflictsExample)
