import type { Meta } from '@storybook/svelte'
import ArrowExample from './examples/arrow.svelte'
import AsChildExample from './examples/as-child.svelte'
import BasicExample from './examples/basic.svelte'
import CloseBehaviorExample from './examples/close-behavior.svelte'
import ControlledExample from './examples/controlled.svelte'
import FactoryExample from './examples/factory.svelte'
import ModalExample from './examples/modal.svelte'
import OnOpenChangeExample from './examples/on-open-change.svelte'
import PortalledExample from './examples/portalled.svelte'
import PositioningExample from './examples/positioning.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components/Popover',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Arrow = {
  render: () => ({
    Component: ArrowExample,
  }),
}

export const AsChild = {
  render: () => ({
    Component: AsChildExample,
  }),
}

export const Factory = {
  render: () => ({
    Component: FactoryExample,
  }),
}

export const CloseBehavior = {
  render: () => ({
    Component: CloseBehaviorExample,
  }),
}

export const Modal = {
  render: () => ({
    Component: ModalExample,
  }),
}

export const OnOpenChange = {
  render: () => ({
    Component: OnOpenChangeExample,
  }),
}

export const Portalled = {
  render: () => ({
    Component: PortalledExample,
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
