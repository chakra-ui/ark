import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import AsyncStepExample from './examples/async-step.vue'
import EventsExample from './examples/events.vue'
import KeyboardNavigationExample from './examples/keyboard-navigation.vue'
import MixedTypesExample from './examples/mixed-types.vue'
import SkipTourExample from './examples/skip-tour.vue'
import WaitForClickExample from './examples/wait-for-click.vue'
import WaitForElementExample from './examples/wait-for-element.vue'
import WaitForInputExample from './examples/wait-for-input.vue'
import ProgressBarExample from './examples/progress-bar.vue'

const meta: Meta = {
  title: 'Components / Tour',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const AsyncStep = {
  render: () => ({
    components: { Component: AsyncStepExample },
    template: '<Component />',
  }),
}

export const Events = {
  render: () => ({
    components: { Component: EventsExample },
    template: '<Component />',
  }),
}

export const KeyboardNavigation = {
  render: () => ({
    components: { Component: KeyboardNavigationExample },
    template: '<Component />',
  }),
}

export const MixedTypes = {
  render: () => ({
    components: { Component: MixedTypesExample },
    template: '<Component />',
  }),
}

export const SkipTour = {
  render: () => ({
    components: { Component: SkipTourExample },
    template: '<Component />',
  }),
}

export const WaitForClick = {
  render: () => ({
    components: { Component: WaitForClickExample },
    template: '<Component />',
  }),
}

export const WaitForElement = {
  render: () => ({
    components: { Component: WaitForElementExample },
    template: '<Component />',
  }),
}

export const WaitForInput = {
  render: () => ({
    components: { Component: WaitForInputExample },
    template: '<Component />',
  }),
}

export const ProgressBar = {
  render: () => ({
    components: { Component: ProgressBarExample },
    template: '<Component />',
  }),
}
