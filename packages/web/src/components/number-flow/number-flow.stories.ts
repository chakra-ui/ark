import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/number-flow/basic.js'
import { mount as ContinuousExample } from '../../../examples/number-flow/continuous.js'
import { mount as FormattingExample } from '../../../examples/number-flow/formatting.js'
import { mount as LiveExample } from '../../../examples/number-flow/live.js'
import { mount as LocaleExample } from '../../../examples/number-flow/locale.js'
import { mount as PrefixSuffixExample } from '../../../examples/number-flow/prefix-suffix.js'
import { mount as TimingExample } from '../../../examples/number-flow/timing.js'

const meta: Meta = { title: 'Components / Number Flow' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Continuous: StoryObj = { name: 'Continuous', render: renderExample(ContinuousExample) }

export const Formatting: StoryObj = { name: 'Formatting', render: renderExample(FormattingExample) }

export const Live: StoryObj = { name: 'Live', render: renderExample(LiveExample) }

export const Locale: StoryObj = { name: 'Locale', render: renderExample(LocaleExample) }

export const PrefixSuffix: StoryObj = { name: 'Prefix Suffix', render: renderExample(PrefixSuffixExample) }

export const Timing: StoryObj = { name: 'Timing', render: renderExample(TimingExample) }
