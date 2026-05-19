import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ListboxBasicExample } from './examples/basic'
import { ListboxEmptyExample } from './examples/empty'
import { ListboxMultipleExample } from './examples/multiple'
import { ListboxRootProviderExample } from './examples/root-provider'
import { ListboxWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / Listbox',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxBasicExample] })],
  render: () => ({ template: '<listbox-basic-example />' }),
}

export const Multiple: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxMultipleExample] })],
  render: () => ({ template: '<listbox-multiple-example />' }),
}

export const Empty: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxEmptyExample] })],
  render: () => ({ template: '<listbox-empty-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxWithFieldExample] })],
  render: () => ({ template: '<listbox-with-field-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxRootProviderExample] })],
  render: () => ({ template: '<listbox-root-provider-example />' }),
}
