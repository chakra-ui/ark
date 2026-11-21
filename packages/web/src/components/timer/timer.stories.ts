import type { Meta, StoryObj } from '@storybook/html-vite'

import { renderExample } from '../../../.storybook/render-example.js'
import { mount as BasicExample } from '../../../examples/timer/basic.js'
import { mount as CountdownExample } from '../../../examples/timer/countdown.js'
import { mount as EventsExample } from '../../../examples/timer/events.js'
import { mount as IntervalExample } from '../../../examples/timer/interval.js'
import { mount as PomodoroExample } from '../../../examples/timer/pomodoro.js'

const meta: Meta = { title: 'Components / Timer' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Countdown: StoryObj = { name: 'Countdown', render: renderExample(CountdownExample) }

export const Events: StoryObj = { name: 'Events', render: renderExample(EventsExample) }

export const Interval: StoryObj = { name: 'Interval', render: renderExample(IntervalExample) }

export const Pomodoro: StoryObj = { name: 'Pomodoro', render: renderExample(PomodoroExample) }
