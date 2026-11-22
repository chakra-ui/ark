import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as ContinuousExample } from './examples/continuous.js'
import { mount as FormattingExample } from './examples/formatting.js'
import { mount as LiveExample } from './examples/live.js'
import { mount as LocaleExample } from './examples/locale.js'
import { mount as PrefixSuffixExample } from './examples/prefix-suffix.js'
import { mount as TimingExample } from './examples/timing.js'
import { mount as WithTimerExample } from './examples/with-timer.js'

const meta: Meta = { title: 'Components / Number Flow' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Continuous: StoryObj = { name: 'Continuous', render: renderExample(ContinuousExample) }

export const Formatting: StoryObj = { name: 'Formatting', render: renderExample(FormattingExample) }

export const Live: StoryObj = { name: 'Live', render: renderExample(LiveExample) }

export const Locale: StoryObj = { name: 'Locale', render: renderExample(LocaleExample) }

export const PrefixSuffix: StoryObj = { name: 'Prefix Suffix', render: renderExample(PrefixSuffixExample) }

export const Timing: StoryObj = { name: 'Timing', render: renderExample(TimingExample) }

export const WithTimer: StoryObj = { name: 'With Timer', render: renderExample(WithTimerExample) }
