import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ScriptExample from './examples/script.vue'
import SrcDocExample from './examples/src-doc.vue'

const meta = {
  title: 'Components / Frame',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const SrcDoc = {
  render: () => ({
    components: { SrcDocExample },
    template: '<SrcDocExample />',
  }),
}

export const Script = {
  render: () => ({
    components: { ScriptExample },
    template: '<ScriptExample />',
  }),
}