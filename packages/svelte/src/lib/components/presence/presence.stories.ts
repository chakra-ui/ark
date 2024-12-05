import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import LazyMountAndUnmountOnExitExample from './examples/lazy-mount-and-unmount-on-exit.svelte'
import LazyMountExample from './examples/lazy-mount.svelte'
import UnmountOnExitExample from './examples/unmount-on-exit.svelte'

const meta = {
  title: 'Components / Presence',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const LazyMount = {
  render: () => ({
    Component: LazyMountExample,
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
