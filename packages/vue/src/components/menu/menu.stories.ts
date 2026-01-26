import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import CheckboxItemsExample from './examples/checkbox-items.vue'
import ContextExample from './examples/context.vue'
import ContextLazyMountExample from './examples/context-lazy-mount.vue'
import ControlledExample from './examples/controlled.vue'
import GroupExample from './examples/group.vue'
import ItemContextExample from './examples/item-context.vue'
import LinksExample from './examples/links.vue'
import MenuInDialogExample from './examples/menu-in-dialog.vue'
import MenuItemDialogExample from './examples/menu-item-dialog.vue'
import MultipleMenuExample from './examples/multiple-menu.vue'
import NestedExample from './examples/nested.vue'
import RadioItemsExample from './examples/radio-items.vue'
import RootProviderExample from './examples/root-provider.vue'
import SelectEventExample from './examples/select-event.vue'

const meta: Meta = {
  title: 'Components / Menu',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const CheckboxItems = {
  render: () => ({
    components: { Component: CheckboxItemsExample },
    template: '<Component />',
  }),
}

export const Context = {
  render: () => ({
    components: { Component: ContextExample },
    template: '<Component />',
  }),
}

export const ContextLazyMount = {
  render: () => ({
    components: { Component: ContextLazyMountExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const Group = {
  render: () => ({
    components: { Component: GroupExample },
    template: '<Component />',
  }),
}

export const ItemContext = {
  render: () => ({
    components: { Component: ItemContextExample },
    template: '<Component />',
  }),
}

export const Links = {
  render: () => ({
    components: { Component: LinksExample },
    template: '<Component />',
  }),
}

export const MenuInDialog = {
  render: () => ({
    components: { Component: MenuInDialogExample },
    template: '<Component />',
  }),
}

export const MenuItemDialog = {
  render: () => ({
    components: { Component: MenuItemDialogExample },
    template: '<Component />',
  }),
}

export const MultipleMenu = {
  render: () => ({
    components: { Component: MultipleMenuExample },
    template: '<Component />',
  }),
}

export const Nested = {
  render: () => ({
    components: { Component: NestedExample },
    template: '<Component />',
  }),
}

export const RadioItems = {
  render: () => ({
    components: { Component: RadioItemsExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const SelectEvent = {
  render: () => ({
    components: { Component: SelectEventExample },
    template: '<Component />',
  }),
}
