import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as AnchorExample } from './examples/anchor.js'
import { mount as ArrowExample } from './examples/arrow.js'
import { mount as BasicExample } from './examples/basic.js'
import { mount as CloseBehaviorExample } from './examples/close-behavior.js'
import { mount as ControlledExample } from './examples/controlled.js'
import { mount as DisableOutsideClickExample } from './examples/disable-outside-click.js'
import { mount as InitialFocusExample } from './examples/initial-focus.js'
import { mount as LazyMountExample } from './examples/lazy-mount.js'
import { mount as ModalExample } from './examples/modal.js'
import { mount as MultipleTriggersExample } from './examples/multiple-triggers.js'
import { mount as NestedExample } from './examples/nested.js'
import { mount as PlacementExample } from './examples/placement.js'
import { mount as PositioningExample } from './examples/positioning.js'
import { mount as SameWidthExample } from './examples/same-width.js'
import { mount as TextSelectionExample } from './examples/text-selection.js'
import { mount as WithDialogExample } from './examples/with-dialog.js'

const meta: Meta = { title: 'Components / Popover' }
export default meta

export const Anchor: StoryObj = { name: 'Anchor', render: renderExample(AnchorExample) }

export const Arrow: StoryObj = { name: 'Arrow', render: renderExample(ArrowExample) }

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const CloseBehavior: StoryObj = { name: 'Close Behavior', render: renderExample(CloseBehaviorExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const DisableOutsideClick: StoryObj = {
  name: 'Disable Outside Click',
  render: renderExample(DisableOutsideClickExample),
}

export const InitialFocus: StoryObj = { name: 'Initial Focus', render: renderExample(InitialFocusExample) }

export const LazyMount: StoryObj = { name: 'Lazy Mount', render: renderExample(LazyMountExample) }

export const Modal: StoryObj = { name: 'Modal', render: renderExample(ModalExample) }

export const MultipleTriggers: StoryObj = { name: 'Multiple Triggers', render: renderExample(MultipleTriggersExample) }

export const Nested: StoryObj = { name: 'Nested', render: renderExample(NestedExample) }

export const Placement: StoryObj = { name: 'Placement', render: renderExample(PlacementExample) }

export const Positioning: StoryObj = { name: 'Positioning', render: renderExample(PositioningExample) }

export const SameWidth: StoryObj = { name: 'Same Width', render: renderExample(SameWidthExample) }

export const WithDialog: StoryObj = { name: 'With Dialog', render: renderExample(WithDialogExample) }

export const TextSelection: StoryObj = { name: 'Text Selection', render: renderExample(TextSelectionExample) }
