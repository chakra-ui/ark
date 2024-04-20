import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'
import { AvatarRoot } from './index'

import Basic from './examples/basic.vue'
import Closed from './examples/closed.vue'
import Context from './examples/context.vue'
import Events from './examples/events.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Avatar',
  component: AvatarRoot,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
  },
  args: {
    name: '',
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    onStatusChange: fn(),
  },
} as Meta<typeof AvatarRoot>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const basic = () => Basic
// export const closed = () => Closed;
export const context = () => Context
export const events = () => Events

export const closed: Story = {
  render: () => ({
    components: { Closed },
    template: `
      <Closed name="Sybren Willemot" />
    `,
  }),
}
