import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import CountdownExample from './examples/countdown.svelte'
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

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const Countdown = {
  render: () => ({
    Component: CountdownExample,
  }),
}

export const Pomodoro = {
  render: () => ({
    Component: PomodoroExample,
  }),
}
