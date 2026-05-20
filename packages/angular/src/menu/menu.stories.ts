import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { MenuBasicExample } from './examples/basic'
import { MenuCheckboxItemsExample } from './examples/checkbox-items'
import { MenuContextExample } from './examples/context'
import { MenuContextLazyMountExample } from './examples/context-lazy-mount'
import { MenuControlledExample } from './examples/controlled'
import { MenuGroupExample } from './examples/group'
import { MenuItemContextExample } from './examples/item-context'
import { MenuItemDialogExample } from './examples/menu-item-dialog'
import { MenuInDialogExample } from './examples/menu-in-dialog'
import { MenuLinksExample } from './examples/links'
import { MenuMultipleMenuExample } from './examples/multiple-menu'
import { MenuMultipleTriggersExample } from './examples/multiple-triggers'
import { MenuNestedExample } from './examples/nested'
import { MenuRadioItemsExample } from './examples/radio-items'
import { MenuRootProviderExample } from './examples/root-provider'
import { MenuSelectEventExample } from './examples/select-event'

const meta: Meta = {
  title: 'Components / Menu',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuBasicExample] })],
  render: () => ({ template: '<menu-basic-example />' }),
}

export const CheckboxItems: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuCheckboxItemsExample] })],
  render: () => ({ template: '<menu-checkbox-items-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuContextExample] })],
  render: () => ({ template: '<menu-context-example />' }),
}

export const ContextLazyMount: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuContextLazyMountExample] })],
  render: () => ({ template: '<menu-context-lazy-mount-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuControlledExample] })],
  render: () => ({ template: '<menu-controlled-example />' }),
}

export const Group: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuGroupExample] })],
  render: () => ({ template: '<menu-group-example />' }),
}

export const Links: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuLinksExample] })],
  render: () => ({ template: '<menu-links-example />' }),
}

export const MenuInDialog: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuInDialogExample] })],
  render: () => ({ template: '<menu-in-dialog-example />' }),
}

export const MenuItemDialog: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuItemDialogExample] })],
  render: () => ({ template: '<menu-item-dialog-example />' }),
}

export const MultipleMenu: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuMultipleMenuExample] })],
  render: () => ({ template: '<menu-multiple-menu-example />' }),
}

export const MultipleTriggers: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuMultipleTriggersExample] })],
  render: () => ({ template: '<menu-multiple-triggers-example />' }),
}

export const Nested: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuNestedExample] })],
  render: () => ({ template: '<menu-nested-example />' }),
}

export const RadioItems: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuRadioItemsExample] })],
  render: () => ({ template: '<menu-radio-items-example />' }),
}

export const ItemContext: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuItemContextExample] })],
  render: () => ({ template: '<menu-item-context-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuRootProviderExample] })],
  render: () => ({ template: '<menu-root-provider-example />' }),
}

export const SelectEvent: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuSelectEventExample] })],
  render: () => ({ template: '<menu-select-event-example />' }),
}
