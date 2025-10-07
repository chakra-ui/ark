import type { Meta } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Components / Collapsible',
}

export default meta

export { Basic } from './examples/basic'
export { Disabled } from './examples/disabled'
export { InitialOpen } from './examples/initial-open'
export { LazyMount } from './examples/lazy-mount'
export { LazyMountAndUnmountOnExit } from './examples/lazy-mount-and-unmount-on-exit'
export { NestedCollapsible } from './examples/nested-collapsible'
export { OnExitComplete } from './examples/on-exit-complete'
export { PartialCollapse } from './examples/partial-collapse'
export { ProgrammaticOpen } from './examples/programmatic-open'
export { RootProvider } from './examples/root-provider'
export { UnmountOnExit } from './examples/unmount-on-exit'
