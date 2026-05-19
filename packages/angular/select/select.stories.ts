import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { SelectBasicExample } from './examples/basic'
import { SelectControlledExample } from './examples/controlled'
import { SelectMultipleExample } from './examples/multiple'
import { SelectRootProviderExample } from './examples/root-provider'
import { SelectWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / Select',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectBasicExample] })],
  render: () => ({ template: '<select-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectControlledExample] })],
  render: () => ({ template: '<select-controlled-example />' }),
}

export const Multiple: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectMultipleExample] })],
  render: () => ({ template: '<select-multiple-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectWithFieldExample] })],
  render: () => ({ template: '<select-with-field-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectRootProviderExample] })],
  render: () => ({ template: '<select-root-provider-example />' }),
}
