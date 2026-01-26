import type { Meta } from '@storybook/svelte'

import AnchorPositionExample from './examples/anchor-position.svelte'
import BasicExample from './examples/basic.svelte'
import ContextExample from './examples/context.svelte'
import ControlledOpenExample from './examples/controlled-open.svelte'
import ControlledPositionExample from './examples/controlled-position.svelte'
import ControlledSizeExample from './examples/controlled-size.svelte'
import LazyMountExample from './examples/lazy-mount.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components/Floating Panel',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const ControlledOpen = {
  render: () => ({
    Component: ControlledOpenExample,
  }),
}

export const ControlledPosition = {
  render: () => ({
    Component: ControlledPositionExample,
  }),
}

export const ControlledSize = {
  render: () => ({
    Component: ControlledSizeExample,
  }),
}

export const LazyMount = {
  render: () => ({
    Component: LazyMountExample,
  }),
}

export const AnchorPosition = {
  render: () => ({
    Component: AnchorPositionExample,
  }),
}

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
