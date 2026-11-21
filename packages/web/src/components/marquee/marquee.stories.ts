import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/marquee/basic.js'
import { mount as AutoFillExample } from '../../../examples/marquee/auto-fill.js'
import { mount as FiniteLoopsExample } from '../../../examples/marquee/finite-loops.js'
import { mount as PauseOnInteractionExample } from '../../../examples/marquee/pause-on-interaction.js'
import { mount as ProgrammaticControlExample } from '../../../examples/marquee/programmatic-control.js'
import { mount as ReverseExample } from '../../../examples/marquee/reverse.js'
import { mount as SpeedExample } from '../../../examples/marquee/speed.js'
import { mount as VerticalExample } from '../../../examples/marquee/vertical.js'
import { mount as WithEdgesExample } from '../../../examples/marquee/with-edges.js'

const meta: Meta = { title: 'Components / Marquee' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const AutoFill: StoryObj = { name: 'Auto Fill', render: renderExample(AutoFillExample) }

export const FiniteLoops: StoryObj = { name: 'Finite Loops', render: renderExample(FiniteLoopsExample) }

export const PauseOnInteraction: StoryObj = {
  name: 'Pause On Interaction',
  render: renderExample(PauseOnInteractionExample),
}

export const ProgrammaticControl: StoryObj = {
  name: 'Programmatic Control',
  render: renderExample(ProgrammaticControlExample),
}

export const Reverse: StoryObj = { name: 'Reverse', render: renderExample(ReverseExample) }

export const Speed: StoryObj = { name: 'Speed', render: renderExample(SpeedExample) }

export const Vertical: StoryObj = { name: 'Vertical', render: renderExample(VerticalExample) }

export const WithEdges: StoryObj = { name: 'With Edges', render: renderExample(WithEdgesExample) }
