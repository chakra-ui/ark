import type { Meta } from '@storybook/svelte'
import AsyncStepExample from './examples/async-step.svelte'
import BasicExample from './examples/basic.svelte'
import EventsExample from './examples/events.svelte'
import KeyboardNavigationExample from './examples/keyboard-navigation.svelte'
import MixedTypesExample from './examples/mixed-types.svelte'
import ProgressBarExample from './examples/progress-bar.svelte'
import SkipTourExample from './examples/skip-tour.svelte'
import WaitForClickExample from './examples/wait-for-click.svelte'
import WaitForElementExample from './examples/wait-for-element.svelte'
import WaitForInputExample from './examples/wait-for-input.svelte'

const meta: Meta = {
  title: 'Components/Tour',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const AsyncStep = {
  render: () => ({
    Component: AsyncStepExample,
  }),
}

export const Events = {
  render: () => ({
    Component: EventsExample,
  }),
}

export const KeyboardNavigation = {
  render: () => ({
    Component: KeyboardNavigationExample,
  }),
}

export const MixedTypes = {
  render: () => ({
    Component: MixedTypesExample,
  }),
}

export const ProgressBar = {
  render: () => ({
    Component: ProgressBarExample,
  }),
}

export const SkipTour = {
  render: () => ({
    Component: SkipTourExample,
  }),
}

export const WaitForClick = {
  render: () => ({
    Component: WaitForClickExample,
  }),
}

export const WaitForElement = {
  render: () => ({
    Component: WaitForElementExample,
  }),
}

export const WaitForInput = {
  render: () => ({
    Component: WaitForInputExample,
  }),
}
