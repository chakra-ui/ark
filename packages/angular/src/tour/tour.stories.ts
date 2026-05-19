import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { TourAsyncStepExample } from './examples/async-step'
import { TourBasicExample } from './examples/basic'
import { TourControlledExample } from './examples/controlled'
import { TourEventsExample } from './examples/events'
import { TourKeyboardNavigationExample } from './examples/keyboard-navigation'
import { TourMixedTypesExample } from './examples/mixed-types'
import { TourProgressBarExample } from './examples/progress-bar'
import { TourSkipTourExample } from './examples/skip-tour'
import { TourWaitForClickExample } from './examples/wait-for-click'
import { TourWaitForElementExample } from './examples/wait-for-element'
import { TourWaitForInputExample } from './examples/wait-for-input'

const meta: Meta = {
  title: 'Components / Tour',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [TourBasicExample] })],
  render: () => ({ template: '<tour-basic-example />' }),
}

export const AsyncStep: StoryObj = {
  decorators: [moduleMetadata({ imports: [TourAsyncStepExample] })],
  render: () => ({ template: '<tour-async-step-example />' }),
}

export const Events: StoryObj = {
  decorators: [moduleMetadata({ imports: [TourEventsExample] })],
  render: () => ({ template: '<tour-events-example />' }),
}

export const KeyboardNavigation: StoryObj = {
  decorators: [moduleMetadata({ imports: [TourKeyboardNavigationExample] })],
  render: () => ({ template: '<tour-keyboard-navigation-example />' }),
}

export const MixedTypes: StoryObj = {
  decorators: [moduleMetadata({ imports: [TourMixedTypesExample] })],
  render: () => ({ template: '<tour-mixed-types-example />' }),
}

export const SkipTour: StoryObj = {
  decorators: [moduleMetadata({ imports: [TourSkipTourExample] })],
  render: () => ({ template: '<tour-skip-tour-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [TourControlledExample] })],
  render: () => ({ template: '<tour-controlled-example />' }),
}

export const WaitForClick: StoryObj = {
  decorators: [moduleMetadata({ imports: [TourWaitForClickExample] })],
  render: () => ({ template: '<tour-wait-for-click-example />' }),
}

export const WaitForElement: StoryObj = {
  decorators: [moduleMetadata({ imports: [TourWaitForElementExample] })],
  render: () => ({ template: '<tour-wait-for-element-example />' }),
}

export const WaitForInput: StoryObj = {
  decorators: [moduleMetadata({ imports: [TourWaitForInputExample] })],
  render: () => ({ template: '<tour-wait-for-input-example />' }),
}

export const ProgressBar: StoryObj = {
  decorators: [moduleMetadata({ imports: [TourProgressBarExample] })],
  render: () => ({ template: '<tour-progress-bar-example />' }),
}
