import { renderExample } from '../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../examples/collapsible/basic.js'
import { mount as DisabledExample } from '../examples/collapsible/disabled.js'
import { mount as HideModeExample } from '../examples/collapsible/hide-mode.js'
import { mount as InitialOpenExample } from '../examples/collapsible/initial-open.js'
import { mount as LazyMountExample } from '../examples/collapsible/lazy-mount.js'
import { mount as NestedExample } from '../examples/collapsible/nested.js'
import { mount as PartialCollapseExample } from '../examples/collapsible/partial-collapse.js'

const meta: Meta = { title: 'Components / Collapsible' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const HideMode: StoryObj = { name: 'Hide Mode', render: renderExample(HideModeExample) }

export const InitialOpen: StoryObj = { name: 'Initial Open', render: renderExample(InitialOpenExample) }

export const LazyMount: StoryObj = { name: 'Lazy Mount', render: renderExample(LazyMountExample) }

export const Nested: StoryObj = { name: 'Nested', render: renderExample(NestedExample) }

export const PartialCollapse: StoryObj = { name: 'Partial Collapse', render: renderExample(PartialCollapseExample) }
