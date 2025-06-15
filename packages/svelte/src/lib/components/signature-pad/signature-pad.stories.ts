import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithContextExample from './examples/with-context.svelte'

const meta: Meta = {
  title: 'Components/SignaturePad',
}

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

export const WithContext = {
  render: () => ({
    Component: WithContextExample,
  }),
}
