import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'

const meta = {
  title: 'Components / Presence',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}
