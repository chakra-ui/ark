import type { Meta } from '@storybook/svelte'
import ArrowExample from './examples/arrow.svelte'
import BasicExample from './examples/basic.svelte'
import ContextExample from './examples/context.svelte'
import ControlledExample from './examples/controlled.svelte'
import DelayExample from './examples/delay.svelte'
import MultipleTriggersExample from './examples/multiple-triggers.svelte'
import PositioningExample from './examples/positioning.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithCheckboxExample from './examples/with-checkbox.svelte'
import WithDialogExample from './examples/with-dialog.svelte'
import WithMenuItemExample from './examples/with-menu-item.svelte'
import WithMenuTriggerExample from './examples/with-menu-trigger.svelte'
import WithPopoverExample from './examples/with-popover.svelte'

const meta: Meta = {
  title: 'Components/Tooltip',
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

export const Delay = {
  render: () => ({
    Component: DelayExample,
  }),
}

export const MultipleTriggers = {
  render: () => ({
    Component: MultipleTriggersExample,
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

export const WithCheckbox = {
  render: () => ({
    Component: WithCheckboxExample,
  }),
}

export const WithDialog = {
  render: () => ({
    Component: WithDialogExample,
  }),
}

export const WithMenuItem = {
  render: () => ({
    Component: WithMenuItemExample,
  }),
}

export const WithMenuTrigger = {
  render: () => ({
    Component: WithMenuTriggerExample,
  }),
}

export const WithPopover = {
  render: () => ({
    Component: WithPopoverExample,
  }),
}
