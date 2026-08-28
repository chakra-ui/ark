import type { Meta } from '@storybook/svelte'
import AnchorExample from './examples/anchor.svelte'
import ArrowExample from './examples/arrow.svelte'
import BasicExample from './examples/basic.svelte'
import CloseBehaviorExample from './examples/close-behavior.svelte'
import ContextExample from './examples/context.svelte'
import ControlledExample from './examples/controlled.svelte'
import ModalExample from './examples/modal.svelte'
import MultipleTriggersExample from './examples/multiple-triggers.svelte'
import NestedExample from './examples/nested.svelte'
import PositioningExample from './examples/positioning.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import SameWidthExample from './examples/same-width.svelte'
import WithDialogExample from './examples/with-dialog.svelte'

const meta: Meta = {
  title: 'Components/Popover',
}

export default meta

export const Anchor = {
  render: () => ({
    Component: AnchorExample,
  }),
}

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Arrow = {
  render: () => ({
    Component: ArrowExample,
  }),
}

export const CloseBehavior = {
  render: () => ({
    Component: CloseBehaviorExample,
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

export const Modal = {
  render: () => ({
    Component: ModalExample,
  }),
}

export const MultipleTriggers = {
  render: () => ({
    Component: MultipleTriggersExample,
  }),
}

export const Nested = {
  render: () => ({
    Component: NestedExample,
  }),
}

export const Positioning = {
  render: () => ({
    Component: PositioningExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const SameWidth = {
  render: () => ({
    Component: SameWidthExample,
  }),
}

export const WithDialog = {
  render: () => ({
    Component: WithDialogExample,
  }),
}
