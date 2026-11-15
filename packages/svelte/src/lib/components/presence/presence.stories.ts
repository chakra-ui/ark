import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import LazyMountAndUnmountOnExitExample from './examples/lazy-mount-and-unmount-on-exit.svelte'
import LazyMountExample from './examples/lazy-mount.svelte'
import SkipAnimationOnMountExample from './examples/skip-animation-on-mount.svelte'
import UnmountOnExitExample from './examples/unmount-on-exit.svelte'

const meta = {
  title: 'Components / Presence',
} as Meta

export default meta

export const Basic = {
  render: (args: Record<string, unknown>) => ({
    Component: BasicExample,
    props: args,
  }),
}

export const LazyMount = {
  render: (args: Record<string, unknown>) => ({
    Component: LazyMountExample,
    props: args,
  }),
}

export const UnmountOnExit = {
  render: (args: Record<string, unknown>) => ({
    Component: UnmountOnExitExample,
    props: args,
  }),
}

export const LazyMountAndUnmountOnExit = {
  render: (args: Record<string, unknown>) => ({
    Component: LazyMountAndUnmountOnExitExample,
    props: args,
  }),
}

export const SkipAnimationOnMount = {
  render: (args: Record<string, unknown>) => ({
    Component: SkipAnimationOnMountExample,
    props: args,
  }),
}
