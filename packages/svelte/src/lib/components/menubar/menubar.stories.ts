import type { Meta } from '@storybook/svelte'

import BasicExample from './examples/basic.svelte'
import DisabledExample from './examples/disabled.svelte'
import NestedExample from './examples/nested.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import VerticalExample from './examples/vertical.svelte'

const meta: Meta = {
  title: 'Components / Menubar',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Disabled = {
  render: () => ({
    Component: DisabledExample,
  }),
}

export const Nested = {
  render: () => ({
    Component: NestedExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const Vertical = {
  render: () => ({
    Component: VerticalExample,
  }),
}
