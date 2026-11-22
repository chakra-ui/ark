import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as ArrowExample } from './examples/arrow.js'
import { mount as BasicExample } from './examples/basic.js'
import { mount as ControlledExample } from './examples/controlled.js'
import { mount as DelayExample } from './examples/delay.js'
import { mount as FollowCursorExample } from './examples/follow-cursor.js'
import { mount as MultipleTriggersExample } from './examples/multiple-triggers.js'
import { mount as PlacementExample } from './examples/placement.js'
import { mount as PositioningExample } from './examples/positioning.js'
import { mount as WithCheckboxExample } from './examples/with-checkbox.js'
import { mount as WithDialogExample } from './examples/with-dialog.js'
import { mount as WithMenuItemExample } from './examples/with-menu-item.js'
import { mount as WithMenuTriggerExample } from './examples/with-menu-trigger.js'
import { mount as WithPopoverExample } from './examples/with-popover.js'
import { mount as WithinFixedExample } from './examples/within-fixed.js'

const meta: Meta = { title: 'Components / Tooltip' }
export default meta

export const Arrow: StoryObj = { name: 'Arrow', render: renderExample(ArrowExample) }

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Delay: StoryObj = { name: 'Delay', render: renderExample(DelayExample) }

export const MultipleTriggers: StoryObj = { name: 'Multiple Triggers', render: renderExample(MultipleTriggersExample) }

export const Placement: StoryObj = { name: 'Placement', render: renderExample(PlacementExample) }

export const Positioning: StoryObj = { name: 'Positioning', render: renderExample(PositioningExample) }

export const WithCheckbox: StoryObj = { name: 'With Checkbox', render: renderExample(WithCheckboxExample) }

export const WithDialog: StoryObj = { name: 'With Dialog', render: renderExample(WithDialogExample) }

export const WithMenuItem: StoryObj = { name: 'With Menu Item', render: renderExample(WithMenuItemExample) }

export const WithMenuTrigger: StoryObj = { name: 'With Menu Trigger', render: renderExample(WithMenuTriggerExample) }

export const WithPopover: StoryObj = { name: 'With Popover', render: renderExample(WithPopoverExample) }

export const WithinFixed: StoryObj = { name: 'Within Fixed', render: renderExample(WithinFixedExample) }

export const FollowCursor: StoryObj = { name: 'Follow Cursor', render: renderExample(FollowCursorExample) }
