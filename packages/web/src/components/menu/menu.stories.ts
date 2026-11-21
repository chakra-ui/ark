import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/menu/basic.js'
import { mount as CheckboxItemsExample } from '../../../examples/menu/checkbox-items.js'
import { mount as ContextLazyMountExample } from '../../../examples/menu/context-lazy-mount.js'
import { mount as ContextExample } from '../../../examples/menu/context.js'
import { mount as ControlledExample } from '../../../examples/menu/controlled.js'
import { mount as FilteringExample } from '../../../examples/menu/filtering.js'
import { mount as GroupExample } from '../../../examples/menu/group.js'
import { mount as LinksExample } from '../../../examples/menu/links.js'
import { mount as MenuInDialogExample } from '../../../examples/menu/menu-in-dialog.js'
import { mount as MenuItemDialogExample } from '../../../examples/menu/menu-item-dialog.js'
import { mount as MultipleMenuExample } from '../../../examples/menu/multiple-menu.js'
import { mount as MultipleTriggersExample } from '../../../examples/menu/multiple-triggers.js'
import { mount as NestedExample } from '../../../examples/menu/nested.js'
import { mount as RadioItemsExample } from '../../../examples/menu/radio-items.js'
import { mount as SelectEventExample } from '../../../examples/menu/select-event.js'

const meta: Meta = { title: 'Components / Menu' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const CheckboxItems: StoryObj = { name: 'Checkbox Items', render: renderExample(CheckboxItemsExample) }

export const ContextLazyMount: StoryObj = { name: 'Context Lazy Mount', render: renderExample(ContextLazyMountExample) }

export const Context: StoryObj = { name: 'Context', render: renderExample(ContextExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Filtering: StoryObj = { name: 'Filtering', render: renderExample(FilteringExample) }

export const Group: StoryObj = { name: 'Group', render: renderExample(GroupExample) }

export const Links: StoryObj = { name: 'Links', render: renderExample(LinksExample) }

export const MenuInDialog: StoryObj = { name: 'Menu In Dialog', render: renderExample(MenuInDialogExample) }

export const MenuItemDialog: StoryObj = { name: 'Menu Item Dialog', render: renderExample(MenuItemDialogExample) }

export const MultipleMenu: StoryObj = { name: 'Multiple Menu', render: renderExample(MultipleMenuExample) }

export const MultipleTriggers: StoryObj = { name: 'Multiple Triggers', render: renderExample(MultipleTriggersExample) }

export const Nested: StoryObj = { name: 'Nested', render: renderExample(NestedExample) }

export const RadioItems: StoryObj = { name: 'Radio Items', render: renderExample(RadioItemsExample) }

export const SelectEvent: StoryObj = { name: 'Select Event', render: renderExample(SelectEventExample) }
