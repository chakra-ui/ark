import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { MenuBasicExample } from './examples/basic'
import { MenuCheckboxItemsExample } from './examples/checkbox-items'
import { MenuControlledExample } from './examples/controlled'
import { MenuControlledHighlightExample } from './examples/controlled-highlight'
import { MenuItemGroupExample } from './examples/item-group'
import { MenuNestedSubmenuExample } from './examples/nested-submenu'
import { MenuRadioItemsExample } from './examples/radio-items'
import { MenuRootProviderExample } from './examples/root-provider'
import { MenuWithSeparatorExample } from './examples/with-separator'

const meta: Meta = {
  title: 'Components / Menu',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuBasicExample] })],
  render: () => ({ template: '<menu-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuControlledExample] })],
  render: () => ({ template: '<menu-controlled-example />' }),
}

export const WithSeparator: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuWithSeparatorExample] })],
  render: () => ({ template: '<menu-with-separator-example />' }),
}

export const ControlledHighlight: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuControlledHighlightExample] })],
  render: () => ({ template: '<menu-controlled-highlight-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuRootProviderExample] })],
  render: () => ({ template: '<menu-root-provider-example />' }),
}

export const CheckboxItems: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuCheckboxItemsExample] })],
  render: () => ({ template: '<menu-checkbox-items-example />' }),
}

export const RadioItems: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuRadioItemsExample] })],
  render: () => ({ template: '<menu-radio-items-example />' }),
}

export const ItemGroup: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuItemGroupExample] })],
  render: () => ({ template: '<menu-item-group-example />' }),
}

export const NestedSubmenu: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuNestedSubmenuExample] })],
  render: () => ({ template: '<menu-nested-submenu-example />' }),
}
