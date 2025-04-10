import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import SetupExample from './examples/setup.svelte'

const meta = {
  title: 'Providers / Locale',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Setup = {
  render: () => ({
    Component: SetupExample,
  }),
}
