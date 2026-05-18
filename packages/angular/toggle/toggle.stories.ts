import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ToggleBasicExample } from './examples/basic'
import { ToggleContextExample } from './examples/context'
import { ToggleControlledExample } from './examples/controlled'
import { ToggleDisabledExample } from './examples/disabled'
import { ToggleIndicatorExample } from './examples/indicator'

const meta: Meta = {
  title: 'Components / Toggle',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToggleBasicExample] })],
  render: () => ({ template: '<toggle-basic-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToggleContextExample] })],
  render: () => ({ template: '<toggle-context-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToggleControlledExample] })],
  render: () => ({ template: '<toggle-controlled-example />' }),
}

export const Disabled: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToggleDisabledExample] })],
  render: () => ({ template: '<toggle-disabled-example />' }),
}

export const Indicator: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToggleIndicatorExample] })],
  render: () => ({ template: '<toggle-indicator-example />' }),
}
