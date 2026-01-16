import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import CountdownExample from './examples/countdown.svelte'
import EventsExample from './examples/events.svelte'
import IntervalExample from './examples/interval.svelte'
import PomodoroExample from './examples/pomodoro.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta = {
  title: 'Components / Timer',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Countdown = {
  render: () => ({
    Component: CountdownExample,
  }),
}

export const Events = {
  render: () => ({
    Component: EventsExample,
  }),
}

export const Interval = {
  render: () => ({
    Component: IntervalExample,
  }),
}

export const Pomodoro = {
  render: () => ({
    Component: PomodoroExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
