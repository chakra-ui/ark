import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as EventsExample } from './examples/events.js'
import { mount as ProgressBarExample } from './examples/progress-bar.js'
import { mount as SkipTourExample } from './examples/skip-tour.js'

import { mount as AsyncStepExample } from './examples/async-step.js'
import { mount as KeyboardNavigationExample } from './examples/keyboard-navigation.js'
import { mount as MixedTypesExample } from './examples/mixed-types.js'
import { mount as WaitForClickExample } from './examples/wait-for-click.js'
import { mount as WaitForElementExample } from './examples/wait-for-element.js'
import { mount as WaitForInputExample } from './examples/wait-for-input.js'
const meta: Meta = { title: 'Components / Tour' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Events: StoryObj = { name: 'Events', render: renderExample(EventsExample) }

export const ProgressBar: StoryObj = { name: 'Progress Bar', render: renderExample(ProgressBarExample) }

export const SkipTour: StoryObj = { name: 'Skip Tour', render: renderExample(SkipTourExample) }

export const AsyncStep: StoryObj = { name: 'Async Step', render: renderExample(AsyncStepExample) }

export const KeyboardNavigation: StoryObj = {
  name: 'Keyboard Navigation',
  render: renderExample(KeyboardNavigationExample),
}

export const MixedTypes: StoryObj = { name: 'Mixed Types', render: renderExample(MixedTypesExample) }

export const WaitForClick: StoryObj = { name: 'Wait For Click', render: renderExample(WaitForClickExample) }

export const WaitForElement: StoryObj = { name: 'Wait For Element', render: renderExample(WaitForElementExample) }

export const WaitForInput: StoryObj = { name: 'Wait For Input', render: renderExample(WaitForInputExample) }
