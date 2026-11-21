import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as AlertDialogExample } from '../../../examples/dialog/alert-dialog.js'
import { mount as BasicExample } from '../../../examples/dialog/basic.js'
import { mount as ConfirmationExample } from '../../../examples/dialog/confirmation.js'
import { mount as ControlledExample } from '../../../examples/dialog/controlled.js'
import { mount as FinalFocusExample } from '../../../examples/dialog/final-focus.js'
import { mount as InitialFocusExample } from '../../../examples/dialog/initial-focus.js'
import { mount as InsideScrollExample } from '../../../examples/dialog/inside-scroll.js'
import { mount as LazyMountExample } from '../../../examples/dialog/lazy-mount.js'
import { mount as MultipleTriggersExample } from '../../../examples/dialog/multiple-triggers.js'
import { mount as NestedExample } from '../../../examples/dialog/nested.js'
import { mount as NonModalExample } from '../../../examples/dialog/non-modal.js'
import { mount as OpenFromMenuExample } from '../../../examples/dialog/open-from-menu.js'
import { mount as OutsideScrollExample } from '../../../examples/dialog/outside-scroll.js'
import { mount as PortalExample } from '../../../examples/dialog/portal.js'
import { mount as RapidStateChangeExample } from '../../../examples/dialog/rapid-state-change.js'

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
