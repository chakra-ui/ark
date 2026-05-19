import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { PresenceBasicExample } from './examples/basic'
import { PresenceLazyMountExample } from './examples/lazy-mount'
import { PresenceLazyMountAndUnmountOnExitExample } from './examples/lazy-mount-and-unmount-on-exit'
import { PresenceSkipAnimationOnMountExample } from './examples/skip-animation-on-mount'
import { PresenceUnmountOnExitExample } from './examples/unmount-on-exit'

const meta: Meta = {
  title: 'Utilities / Presence',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [PresenceBasicExample] })],
  render: () => ({ template: '<presence-basic-example />' }),
}

export const LazyMount: StoryObj = {
  decorators: [moduleMetadata({ imports: [PresenceLazyMountExample] })],
  render: () => ({ template: '<presence-lazy-mount-example />' }),
}

export const UnmountOnExit: StoryObj = {
  decorators: [moduleMetadata({ imports: [PresenceUnmountOnExitExample] })],
  render: () => ({ template: '<presence-unmount-on-exit-example />' }),
}

export const LazyMountAndUnmountOnExit: StoryObj = {
  decorators: [moduleMetadata({ imports: [PresenceLazyMountAndUnmountOnExitExample] })],
  render: () => ({ template: '<presence-lazy-mount-and-unmount-on-exit-example />' }),
}

export const SkipAnimationOnMount: StoryObj = {
  decorators: [moduleMetadata({ imports: [PresenceSkipAnimationOnMountExample] })],
  render: () => ({ template: '<presence-skip-animation-on-mount-example />' }),
}
