import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as EventsExample } from './examples/events.js'
import { mount as ProgressBarExample } from './examples/progress-bar.js'
import { mount as SkipTourExample } from './examples/skip-tour.js'

const meta: Meta = { title: 'Components / Tour' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Events: StoryObj = { name: 'Events', render: renderExample(EventsExample) }

export const ProgressBar: StoryObj = { name: 'Progress Bar', render: renderExample(ProgressBarExample) }

export const SkipTour: StoryObj = { name: 'Skip Tour', render: renderExample(SkipTourExample) }
