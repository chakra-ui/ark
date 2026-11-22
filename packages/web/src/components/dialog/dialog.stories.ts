import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as AlertDialogExample } from './examples/alert-dialog.js'
import { mount as BasicExample } from './examples/basic.js'
import { mount as ConfirmationExample } from './examples/confirmation.js'
import { mount as ControlledExample } from './examples/controlled.js'
import { mount as FinalFocusExample } from './examples/final-focus.js'
import { mount as InitialFocusExample } from './examples/initial-focus.js'
import { mount as InsideScrollExample } from './examples/inside-scroll.js'
import { mount as LazyMountExample } from './examples/lazy-mount.js'
import { mount as MultipleTriggersExample } from './examples/multiple-triggers.js'
import { mount as NestedExample } from './examples/nested.js'
import { mount as NonModalExample } from './examples/non-modal.js'
import { mount as OpenFromMenuExample } from './examples/open-from-menu.js'
import { mount as OutsideScrollExample } from './examples/outside-scroll.js'
import { mount as PortalExample } from './examples/portal.js'
import { mount as RapidStateChangeExample } from './examples/rapid-state-change.js'

const meta: Meta = { title: 'Components / Dialog' }
export default meta

export const AlertDialog: StoryObj = { name: 'Alert Dialog', render: renderExample(AlertDialogExample) }

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Confirmation: StoryObj = { name: 'Confirmation', render: renderExample(ConfirmationExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const FinalFocus: StoryObj = { name: 'Final Focus', render: renderExample(FinalFocusExample) }

export const InitialFocus: StoryObj = { name: 'Initial Focus', render: renderExample(InitialFocusExample) }

export const InsideScroll: StoryObj = { name: 'Inside Scroll', render: renderExample(InsideScrollExample) }

export const LazyMount: StoryObj = { name: 'Lazy Mount', render: renderExample(LazyMountExample) }

export const MultipleTriggers: StoryObj = { name: 'Multiple Triggers', render: renderExample(MultipleTriggersExample) }

export const Nested: StoryObj = { name: 'Nested', render: renderExample(NestedExample) }

export const NonModal: StoryObj = { name: 'Non Modal', render: renderExample(NonModalExample) }

export const OpenFromMenu: StoryObj = { name: 'Open From Menu', render: renderExample(OpenFromMenuExample) }

export const OutsideScroll: StoryObj = { name: 'Outside Scroll', render: renderExample(OutsideScrollExample) }

export const Portal: StoryObj = { name: 'Portal', render: renderExample(PortalExample) }

export const RapidStateChange: StoryObj = { name: 'Rapid State Change', render: renderExample(RapidStateChangeExample) }
