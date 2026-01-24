import type { Meta } from '@storybook/svelte'

import AlertDialogExample from './examples/alert-dialog.svelte'
import BasicExample from './examples/basic.svelte'
import CloseOnEscapeExample from './examples/close-on-escape.svelte'
import CloseOnInteractOutsideExample from './examples/close-on-interact-outside.svelte'
import ConfirmationExample from './examples/confirmation.svelte'
import ContextExample from './examples/context.svelte'
import ControlledExample from './examples/controlled.svelte'
import FinalFocusExample from './examples/final-focus.svelte'
import InitialFocusExample from './examples/initial-focus.svelte'
import InsideScrollExample from './examples/inside-scroll.svelte'
import LazyMountExample from './examples/lazy-mount.svelte'
import NestedExample from './examples/nested.svelte'
import NonModalExample from './examples/non-modal.svelte'
import OpenFromMenuExample from './examples/open-from-menu.svelte'
import OutsideScrollExample from './examples/outside-scroll.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components / Dialog',
}

export default meta

export const AlertDialog = {
  render: () => ({
    Component: AlertDialogExample,
  }),
}

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const CloseOnEscape = {
  render: () => ({
    Component: CloseOnEscapeExample,
  }),
}

export const CloseOnInteractOutside = {
  render: () => ({
    Component: CloseOnInteractOutsideExample,
  }),
}

export const Confirmation = {
  render: () => ({
    Component: ConfirmationExample,
  }),
}

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const FinalFocus = {
  render: () => ({
    Component: FinalFocusExample,
  }),
}

export const InitialFocus = {
  render: () => ({
    Component: InitialFocusExample,
  }),
}

export const InsideScroll = {
  render: () => ({
    Component: InsideScrollExample,
  }),
}

export const LazyMount = {
  render: () => ({
    Component: LazyMountExample,
  }),
}

export const Nested = {
  render: () => ({
    Component: NestedExample,
  }),
}

export const NonModal = {
  render: () => ({
    Component: NonModalExample,
  }),
}

export const OpenFromMenu = {
  render: () => ({
    Component: OpenFromMenuExample,
  }),
}

export const OutsideScroll = {
  render: () => ({
    Component: OutsideScrollExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
