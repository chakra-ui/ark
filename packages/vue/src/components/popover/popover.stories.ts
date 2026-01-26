import type { Meta } from '@storybook/vue3-vite'

import ArrowExample from './examples/arrow.vue'
import BasicExample from './examples/basic.vue'
import CloseBehaviorExample from './examples/close-behavior.vue'
import ContextExample from './examples/context.vue'
import ControlledExample from './examples/controlled.vue'
import ModalExample from './examples/modal.vue'
import PositioningExample from './examples/positioning.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithDialogExample from './examples/with-dialog.vue'

const meta: Meta = {
  title: 'Components / Popover',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Arrow = {
  render: () => ({
    components: { Component: ArrowExample },
    template: '<Component />',
  }),
}

export const CloseBehavior = {
  render: () => ({
    components: { Component: CloseBehaviorExample },
    template: '<Component />',
  }),
}

export const Context = {
  render: () => ({
    components: { Component: ContextExample },
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

export const Positioning = {
  render: () => ({
    components: { Component: PositioningExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const WithDialog = {
  render: () => ({
    components: { Component: WithDialogExample },
    template: '<Component />',
  }),
}
