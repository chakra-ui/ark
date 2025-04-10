import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'

const meta = {
  title: 'Providers / Environment',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}
