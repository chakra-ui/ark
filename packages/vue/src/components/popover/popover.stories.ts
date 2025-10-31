import type { Meta } from '@storybook/vue3-vite'

import ArrowExample from './examples/arrow.vue'
import AsChildExample from './examples/as-child.vue'
import BasicExample from './examples/basic.vue'
import CloseBehaviorExample from './examples/close-behavior.vue'
import ControlledExample from './examples/controlled.vue'
import FactoryExample from './examples/factory.vue'
import ModalExample from './examples/modal.vue'
import OnOpenChangeExample from './examples/on-open-change.vue'
import PortalledExample from './examples/portalled.vue'
import PositioningExample from './examples/positioning.vue'
import RenderFnExample from './examples/render-fn.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta: Meta = {
  title: 'Components / Popover',
}

export default meta

export const Arrow = {
  render: () => ({
    components: { Component: ArrowExample },
    template: '<Component />',
  }),
}

export const AsChild = {
  render: () => ({
    components: { Component: AsChildExample },
    template: '<Component />',
  }),
}

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const CloseBehavior = {
  render: () => ({
    components: { Component: CloseBehaviorExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const Factory = {
  render: () => ({
    components: { Component: FactoryExample },
    template: '<Component />',
  }),
}

export const Modal = {
  render: () => ({
    components: { Component: ModalExample },
    template: '<Component />',
  }),
}

export const OnOpenChange = {
  render: () => ({
    components: { Component: OnOpenChangeExample },
    template: '<Component />',
  }),
}

export const Portalled = {
  render: () => ({
    components: { Component: PortalledExample },
    template: '<Component />',
  }),
}

export const Positioning = {
  render: () => ({
    components: { Component: PositioningExample },
    template: '<Component />',
  }),
}

export const RenderFn = {
  render: () => ({
    components: { Component: RenderFnExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}
