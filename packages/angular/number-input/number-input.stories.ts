import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { NumberInputBasicExample } from './examples/basic'
import { NumberInputContextExample } from './examples/context'
import { NumberInputFormattingExample } from './examples/formatting'
import { NumberInputFractionDigitsExample } from './examples/fraction-digits'
import { NumberInputMinMaxExample } from './examples/min-max'
import { NumberInputMouseWheelExample } from './examples/mouse-wheel'
import { NumberInputRootProviderExample } from './examples/root-provider'
import { NumberInputScrubberExample } from './examples/scrubber'
import { NumberInputWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / Number Input',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [NumberInputBasicExample] })],
  render: () => ({ template: '<number-input-basic-example />' }),
}

export const Formatting: StoryObj = {
  decorators: [moduleMetadata({ imports: [NumberInputFormattingExample] })],
  render: () => ({ template: '<number-input-formatting-example />' }),
}

export const FractionDigits: StoryObj = {
  decorators: [moduleMetadata({ imports: [NumberInputFractionDigitsExample] })],
  render: () => ({ template: '<number-input-fraction-digits-example />' }),
}

export const MinMax: StoryObj = {
  decorators: [moduleMetadata({ imports: [NumberInputMinMaxExample] })],
  render: () => ({ template: '<number-input-min-max-example />' }),
}

export const MouseWheel: StoryObj = {
  decorators: [moduleMetadata({ imports: [NumberInputMouseWheelExample] })],
  render: () => ({ template: '<number-input-mouse-wheel-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [NumberInputContextExample] })],
  render: () => ({ template: '<number-input-context-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [NumberInputRootProviderExample] })],
  render: () => ({ template: '<number-input-root-provider-example />' }),
}

export const Scrubber: StoryObj = {
  decorators: [moduleMetadata({ imports: [NumberInputScrubberExample] })],
  render: () => ({ template: '<number-input-scrubber-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [NumberInputWithFieldExample] })],
  render: () => ({ template: '<number-input-with-field-example />' }),
}
