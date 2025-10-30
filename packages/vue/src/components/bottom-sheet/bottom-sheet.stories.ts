import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import ModalExample from './examples/modal.vue'
import RootProviderExample from './examples/root-provider.vue'
import SnapPointsExample from './examples/snap-points.vue'
import ScrollableExample from './examples/scrollable.vue'
import NoDragAreaExample from './examples/no-drag-area.vue'
import NonDraggableExample from './examples/non-draggable.vue'

const meta: Meta = {
  title: 'Components / BottomSheet',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const Modal = {
  render: () => ({
    components: { Component: ModalExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const SnapPoints = {
  render: () => ({
    components: { Component: SnapPointsExample },
    template: '<Component />',
  }),
}

export const Scrollable = {
  render: () => ({
    components: { Component: ScrollableExample },
    template: '<Component />',
  }),
}

export const NoDragArea = {
  render: () => ({
    components: { Component: NoDragAreaExample },
    template: '<Component />',
  }),
}

export const NonDraggable = {
  render: () => ({
    components: { Component: NonDraggableExample },
    template: '<Component />',
  }),
}
