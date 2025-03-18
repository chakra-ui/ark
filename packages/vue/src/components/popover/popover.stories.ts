import type { Meta } from '@storybook/vue3'

import ArrowExample from './examples/arrow.vue'
import BasicExample from './examples/basic.vue'
import CloseBehaviorExample from './examples/close-behavior.vue'
import ControlledExample from './examples/controlled.vue'
import ModalExample from './examples/modal.vue'
import OnOpenChangeExample from './examples/on-open-change.vue'
import PortalledExample from './examples/portalled.vue'
import PositioningExample from './examples/positioning.vue'
import RenderFnExample from './examples/render-fn.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta = {
  title: 'Components / Popover',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Portalled = {
  render: () => ({
    components: { PortalledExample },
    template: '<PortalledExample />',
  }),
}

export const OnOpenChange = {
  render: () => ({
    components: { OnOpenChangeExample },
    template: '<OnOpenChangeExample />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { ControlledExample },
    template: '<ControlledExample />',
  }),
}

export const RenderFn = {
  render: () => ({
    components: { RenderFnExample },
    template: '<RenderFnExample />',
  }),
}

export const Arrow = {
  render: () => ({
    components: { ArrowExample },
    template: '<ArrowExample />',
  }),
}

export const CloseBehavior = {
  render: () => ({
    components: { CloseBehaviorExample },
    template: '<CloseBehaviorExample />',
  }),
}

export const Positioning = {
  render: () => ({
    components: { PositioningExample },
    template: '<PositioningExample />',
  }),
}

export const Modal = {
  render: () => ({
    components: { ModalExample },
    template: '<ModalExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}