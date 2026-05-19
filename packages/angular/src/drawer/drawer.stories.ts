import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { DrawerBasicExample } from './examples/basic'
import { DrawerControlledExample } from './examples/controlled'
import { DrawerDefaultOpenExample } from './examples/default-open'
import { DrawerIndentBackgroundExample } from './examples/indent-background'
import { DrawerModalExample } from './examples/modal'
import { DrawerMultipleTriggersExample } from './examples/multiple-triggers'
import { DrawerNoDragAreaExample } from './examples/no-drag-area'
import { DrawerNonDraggableExample } from './examples/non-draggable'
import { DrawerRootProviderExample } from './examples/root-provider'
import { DrawerScrollableExample } from './examples/scrollable'
import { DrawerSnapPointsExample } from './examples/snap-points'
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

export const SnapPoints: StoryObj = {
  decorators: [moduleMetadata({ imports: [DrawerSnapPointsExample] })],
  render: () => ({ template: '<drawer-snap-points-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [DrawerControlledExample] })],
  render: () => ({ template: '<drawer-controlled-example />' }),
}

export const Modal: StoryObj = {
  decorators: [moduleMetadata({ imports: [DrawerModalExample] })],
  render: () => ({ template: '<drawer-modal-example />' }),
}

export const MultipleTriggers: StoryObj = {
  decorators: [moduleMetadata({ imports: [DrawerMultipleTriggersExample] })],
  render: () => ({ template: '<drawer-multiple-triggers-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [DrawerRootProviderExample] })],
  render: () => ({ template: '<drawer-root-provider-example />' }),
}

export const Scrollable: StoryObj = {
  decorators: [moduleMetadata({ imports: [DrawerScrollableExample] })],
  render: () => ({ template: '<drawer-scrollable-example />' }),
}

export const NoDragArea: StoryObj = {
  decorators: [moduleMetadata({ imports: [DrawerNoDragAreaExample] })],
  render: () => ({ template: '<drawer-no-drag-area-example />' }),
}

export const NonDraggable: StoryObj = {
  decorators: [moduleMetadata({ imports: [DrawerNonDraggableExample] })],
  render: () => ({ template: '<drawer-non-draggable-example />' }),
}

export const IndentBackground: StoryObj = {
  decorators: [moduleMetadata({ imports: [DrawerIndentBackgroundExample] })],
  render: () => ({ template: '<drawer-indent-background-example />' }),
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
