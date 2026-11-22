import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as ControlledExample } from './examples/controlled.js'
import { mount as DisabledTabExample } from './examples/disabled-tab.js'
import { mount as IndicatorExample } from './examples/indicator.js'
import { mount as LazyMountExample } from './examples/lazy-mount.js'
import { mount as LinksExample } from './examples/links.js'
import { mount as ManualActivationExample } from './examples/manual-activation.js'
import { mount as VerticalExample } from './examples/vertical.js'

const meta: Meta = { title: 'Components / Tabs' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const DisabledTab: StoryObj = { name: 'Disabled Tab', render: renderExample(DisabledTabExample) }

export const Indicator: StoryObj = { name: 'Indicator', render: renderExample(IndicatorExample) }

export const LazyMount: StoryObj = { name: 'Lazy Mount', render: renderExample(LazyMountExample) }

export const Links: StoryObj = { name: 'Links', render: renderExample(LinksExample) }

export const ManualActivation: StoryObj = { name: 'Manual Activation', render: renderExample(ManualActivationExample) }

export const Vertical: StoryObj = { name: 'Vertical', render: renderExample(VerticalExample) }
