import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ComboboxBasicExample } from './examples/basic'
import { ComboboxControlledExample } from './examples/controlled'
import { ComboboxFilterableExample } from './examples/filterable'
import { ComboboxRootProviderExample } from './examples/root-provider'
import { ComboboxWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / Combobox',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxBasicExample] })],
  render: () => ({ template: '<combobox-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxControlledExample] })],
  render: () => ({ template: '<combobox-controlled-example />' }),
}

export const Filterable: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxFilterableExample] })],
  render: () => ({ template: '<combobox-filterable-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxWithFieldExample] })],
  render: () => ({ template: '<combobox-with-field-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxRootProviderExample] })],
  render: () => ({ template: '<combobox-root-provider-example />' }),
}
