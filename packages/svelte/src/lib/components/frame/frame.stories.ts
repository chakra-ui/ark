import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ScriptExample from './examples/script.svelte'
import SrcDocExample from './examples/src-doc.svelte'

const meta = {
  title: 'Components / Frame',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Script = {
  render: () => ({
    Component: ScriptExample,
  }),
}

export const SrcDoc = {
  render: () => ({
    Component: SrcDocExample,
  }),
}
