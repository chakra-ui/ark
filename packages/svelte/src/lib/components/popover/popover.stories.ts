import type { Meta } from '@storybook/svelte'
import ArrowExample from './examples/arrow.svelte'
import BasicExample from './examples/basic.svelte'
import CloseBehaviorExample from './examples/close-behavior.svelte'
import ContextExample from './examples/context.svelte'
import ControlledExample from './examples/controlled.svelte'
import ModalExample from './examples/modal.svelte'
import PositioningExample from './examples/positioning.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithDialogExample from './examples/with-dialog.svelte'

const meta: Meta = {
  title: 'Components/Popover',
}

export default meta

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

export const WithDialog = {
  render: () => ({
    Component: WithDialogExample,
  }),
}
