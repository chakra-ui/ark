import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { DrawerBasicExample } from './examples/basic'
import { DrawerControlledExample } from './examples/controlled'
import { DrawerDefaultOpenExample } from './examples/default-open'
import { DrawerRootProviderExample } from './examples/root-provider'
import { DrawerSwipeDirectionExample } from './examples/swipe-direction'
import { DrawerWithTitleDescriptionExample } from './examples/with-title-description'

const meta: Meta = {
  title: 'Components / Drawer',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [DrawerBasicExample] })],
  render: () => ({ template: '<drawer-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [DrawerControlledExample] })],
  render: () => ({ template: '<drawer-controlled-example />' }),
}

export const DefaultOpen: StoryObj = {
  decorators: [moduleMetadata({ imports: [DrawerDefaultOpenExample] })],
  render: () => ({ template: '<drawer-default-open-example />' }),
}

export const SwipeDirection: StoryObj = {
  decorators: [moduleMetadata({ imports: [DrawerSwipeDirectionExample] })],
  render: () => ({ template: '<drawer-swipe-direction-example />' }),
}

export const WithTitleDescription: StoryObj = {
  decorators: [moduleMetadata({ imports: [DrawerWithTitleDescriptionExample] })],
  render: () => ({ template: '<drawer-with-title-description-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [DrawerRootProviderExample] })],
  render: () => ({ template: '<drawer-root-provider-example />' }),
}
