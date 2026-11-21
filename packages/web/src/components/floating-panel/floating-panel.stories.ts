import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/floating-panel/basic.js'
import { mount as ControlledOpenExample } from '../../../examples/floating-panel/controlled-open.js'
import { mount as ControlledSizeExample } from '../../../examples/floating-panel/controlled-size.js'
import { mount as ControlledPositionExample } from '../../../examples/floating-panel/controlled-position.js'
import { mount as AnchorPositionExample } from '../../../examples/floating-panel/anchor-position.js'
import { mount as LazyMountExample } from '../../../examples/floating-panel/lazy-mount.js'

const meta: Meta = { title: 'Components / Floating Panel' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const ControlledOpen: StoryObj = { name: 'Controlled Open', render: renderExample(ControlledOpenExample) }

export const ControlledSize: StoryObj = { name: 'Controlled Size', render: renderExample(ControlledSizeExample) }

export const ControlledPosition: StoryObj = {
  name: 'Controlled Position',
  render: renderExample(ControlledPositionExample),
}

export const AnchorPosition: StoryObj = { name: 'Anchor Position', render: renderExample(AnchorPositionExample) }

export const LazyMount: StoryObj = { name: 'Lazy Mount', render: renderExample(LazyMountExample) }
