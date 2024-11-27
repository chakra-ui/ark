import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta = {
  title: 'Components / Avatar',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
