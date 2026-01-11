import type { Meta } from '@storybook/svelte'

import BasicExample from './examples/basic.svelte'
import CheckboxItemsExample from './examples/checkbox-items.svelte'
import ContextExample from './examples/context.svelte'
import ContextLazyMountExample from './examples/context-lazy-mount.svelte'
import ControlledExample from './examples/controlled.svelte'
import GroupExample from './examples/group.svelte'
import ItemContextExample from './examples/item-context.svelte'
import LinksExample from './examples/links.svelte'
import MenuInDialogExample from './examples/menu-in-dialog.svelte'
import MenuItemDialogExample from './examples/menu-item-dialog.svelte'
import MultipleMenuExample from './examples/multiple-menu.svelte'
import NestedExample from './examples/nested.svelte'
import RadioItemsExample from './examples/radio-items.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import SelectEventExample from './examples/select-event.svelte'

const meta: Meta = {
  title: 'Components / Menu',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const CheckboxItems = {
  render: () => ({
    Component: CheckboxItemsExample,
  }),
}

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}

export const ContextLazyMount = {
  render: () => ({
    Component: ContextLazyMountExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Group = {
  render: () => ({
    Component: GroupExample,
  }),
}

export const ItemContext = {
  render: () => ({
    Component: ItemContextExample,
  }),
}

export const Links = {
  render: () => ({
    Component: LinksExample,
  }),
}

export const MenuInDialog = {
  render: () => ({
    Component: MenuInDialogExample,
  }),
}

export const MenuItemDialog = {
  render: () => ({
    Component: MenuItemDialogExample,
  }),
}

export const MultipleMenu = {
  render: () => ({
    Component: MultipleMenuExample,
  }),
}

export const Nested = {
  render: () => ({
    Component: NestedExample,
  }),
}

export const RadioItems = {
  render: () => ({
    Component: RadioItemsExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const SelectEvent = {
  render: () => ({
    Component: SelectEventExample,
  }),
}
