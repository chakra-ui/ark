import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import RenderPropExample from './examples/render-prop.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components/Clipboard',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const RenderProp = {
  render: () => ({
    Component: RenderPropExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
