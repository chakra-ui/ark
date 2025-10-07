import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import DisabledExample from './examples/disabled.svelte'
import InitialOpenExample from './examples/initial-open.svelte'
import LazyMountAndUnmountOnExitExample from './examples/lazy-mount-and-unmount-on-exit.svelte'
import LazyMountExample from './examples/lazy-mount.svelte'
import NestedCollapsibleExample from './examples/nested-collapsible.svelte'
import OnExitCompleteExample from './examples/on-exit-complete.svelte'
import PartialCollapseExample from './examples/partial-collapse.svelte'
import ProgrammaticOpenExample from './examples/programmatic-open.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import UnmountOnExitExample from './examples/unmount-on-exit.svelte'

const meta: Meta = {
  title: 'Components/Collapsible',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Disabled = {
  render: () => ({
    Component: DisabledExample,
  }),
}

export const InitialOpen = {
  render: () => ({
    Component: InitialOpenExample,
  }),
}

export const LazyMount = {
  render: () => ({
    Component: LazyMountExample,
  }),
}

export const NestedCollapsible = {
  render: () => ({
    Component: NestedCollapsibleExample,
  }),
}

export const UnmountOnExit = {
  render: () => ({
    Component: UnmountOnExitExample,
  }),
}

export const LazyMountAndUnmountOnExit = {
  render: () => ({
    Component: LazyMountAndUnmountOnExitExample,
  }),
}

export const OnExitComplete = {
  render: () => ({
    Component: OnExitCompleteExample,
  }),
}

export const PartialCollapse = {
  render: () => ({
    Component: PartialCollapseExample,
  }),
}

export const ProgrammaticOpen = {
  render: () => ({
    Component: ProgrammaticOpenExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
