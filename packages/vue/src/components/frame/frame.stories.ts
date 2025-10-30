import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ScriptExample from './examples/script.vue'
import SrcDocExample from './examples/src-doc.vue'

const meta: Meta = {
  title: 'Utilities / Frame',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const SrcDoc = {
  render: () => ({
    components: { Component: SrcDocExample },
    template: '<Component />',
  }),
}

export const Script = {
  render: () => ({
    components: { Component: ScriptExample },
    template: '<Component />',
  }),
}
