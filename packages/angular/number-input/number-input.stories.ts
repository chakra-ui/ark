import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { NumberInputBasicExample } from './examples/basic'
import { NumberInputControlledExample } from './examples/controlled'
import { NumberInputMinMaxExample } from './examples/min-max'
import { NumberInputRootProviderExample } from './examples/root-provider'
import { NumberInputWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / Number Input',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [NumberInputBasicExample] })],
  render: () => ({ template: '<number-input-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [NumberInputControlledExample] })],
  render: () => ({ template: '<number-input-controlled-example />' }),
}

export const MinMax: StoryObj = {
  decorators: [moduleMetadata({ imports: [NumberInputMinMaxExample] })],
  render: () => ({ template: '<number-input-min-max-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [NumberInputWithFieldExample] })],
  render: () => ({ template: '<number-input-with-field-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [NumberInputRootProviderExample] })],
  render: () => ({ template: '<number-input-root-provider-example />' }),
}
