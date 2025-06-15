import type { Meta, StoryObj } from '@storybook/svelte'
import AutoplayExample from './examples/autoplay.svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import { Carousel } from './index'

const meta = {
  title: 'Components/Carousel',
  component: Carousel.Root,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A carousel is a slideshow for cycling through a series of content, built with CSS transforms and JavaScript.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Controlled: Story = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Autoplay: Story = {
  render: () => ({
    Component: AutoplayExample,
  }),
}

export const RootProvider: Story = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
