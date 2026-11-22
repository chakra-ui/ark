import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as ControlledExample } from './examples/controlled.js'
import { mount as DefaultValueExample } from './examples/default-value.js'
import { mount as DisabledExample } from './examples/disabled.js'
import { mount as GranularityExample } from './examples/granularity.js'
import { mount as InvalidExample } from './examples/invalid.js'
import { mount as LocalizedExample } from './examples/localized.js'
import { mount as MinMaxExample } from './examples/min-max.js'
import { mount as TimeOnlyExample } from './examples/time-only.js'
import { mount as WithClearButtonExample } from './examples/with-clear-button.js'

const meta: Meta = { title: 'Components / Date Input' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const DefaultValue: StoryObj = { name: 'Default Value', render: renderExample(DefaultValueExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const Granularity: StoryObj = { name: 'Granularity', render: renderExample(GranularityExample) }

export const Invalid: StoryObj = { name: 'Invalid', render: renderExample(InvalidExample) }

export const Localized: StoryObj = { name: 'Localized', render: renderExample(LocalizedExample) }

export const MinMax: StoryObj = { name: 'Min Max', render: renderExample(MinMaxExample) }

export const TimeOnly: StoryObj = { name: 'Time Only', render: renderExample(TimeOnlyExample) }

export const WithClearButton: StoryObj = {
  name: 'With Clear Button',
  render: renderExample(WithClearButtonExample),
}
