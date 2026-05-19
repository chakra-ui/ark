import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { TimerBasicExample } from './examples/basic'
import { TimerCountdownExample } from './examples/countdown'
import { TimerEventsExample } from './examples/events'
import { TimerIntervalExample } from './examples/interval'
import { TimerPomodoroExample } from './examples/pomodoro'
import { TimerRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Timer',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [TimerBasicExample] })],
  render: () => ({ template: '<timer-basic-example />' }),
}

export const Countdown: StoryObj = {
  decorators: [moduleMetadata({ imports: [TimerCountdownExample] })],
  render: () => ({ template: '<timer-countdown-example />' }),
}

export const Events: StoryObj = {
  decorators: [moduleMetadata({ imports: [TimerEventsExample] })],
  render: () => ({ template: '<timer-events-example />' }),
}

export const Interval: StoryObj = {
  decorators: [moduleMetadata({ imports: [TimerIntervalExample] })],
  render: () => ({ template: '<timer-interval-example />' }),
}

export const Pomodoro: StoryObj = {
  decorators: [moduleMetadata({ imports: [TimerPomodoroExample] })],
  render: () => ({ template: '<timer-pomodoro-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [TimerRootProviderExample] })],
  render: () => ({ template: '<timer-root-provider-example />' }),
}
