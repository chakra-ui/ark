import type { Meta } from '@storybook/vue3-vite'

import AlertDialogExample from './examples/alert-dialog.vue'
import BasicExample from './examples/basic.vue'
import ConfirmationExample from './examples/confirmation.vue'
import ContextExample from './examples/context.vue'
import ControlledExample from './examples/controlled.vue'
import FinalFocusExample from './examples/final-focus.vue'
import InitialFocusExample from './examples/initial-focus.vue'
import InsideScrollExample from './examples/inside-scroll.vue'
import LazyMountExample from './examples/lazy-mount.vue'
import NestedExample from './examples/nested.vue'
import NonModalExample from './examples/non-modal.vue'
import OpenFromMenuExample from './examples/open-from-menu.vue'
import OutsideScrollExample from './examples/outside-scroll.vue'
import RootProviderExample from './examples/root-provider.vue'

const meta: Meta = {
  title: 'Components / Dialog',
}

export default meta

export const AlertDialog = {
  render: () => ({
    components: { Component: AlertDialogExample },
    template: '<Component />',
  }),
}

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Confirmation = {
  render: () => ({
    components: { Component: ConfirmationExample },
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

export const FinalFocus = {
  render: () => ({
    components: { Component: FinalFocusExample },
    template: '<Component />',
  }),
}

export const InitialFocus = {
  render: () => ({
    components: { Component: InitialFocusExample },
    template: '<Component />',
  }),
}

export const InsideScroll = {
  render: () => ({
    components: { Component: InsideScrollExample },
    template: '<Component />',
  }),
}

export const LazyMount = {
  render: () => ({
    components: { Component: LazyMountExample },
    template: '<Component />',
  }),
}

export const Nested = {
  render: () => ({
    components: { Component: NestedExample },
    template: '<Component />',
  }),
}

export const NonModal = {
  render: () => ({
    components: { Component: NonModalExample },
    template: '<Component />',
  }),
}

export const OpenFromMenu = {
  render: () => ({
    components: { Component: OpenFromMenuExample },
    template: '<Component />',
  }),
}

export const OutsideScroll = {
  render: () => ({
    components: { Component: OutsideScrollExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}
