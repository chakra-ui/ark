import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { TagsInputBasicExample } from './examples/basic'
import { TagsInputControlledExample } from './examples/controlled'
import { TagsInputMaxTagsExample } from './examples/max-tags'
import { TagsInputRootProviderExample } from './examples/root-provider'
import { TagsInputWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / Tags Input',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputBasicExample] })],
  render: () => ({ template: '<tags-input-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputControlledExample] })],
  render: () => ({ template: '<tags-input-controlled-example />' }),
}

export const MaxTags: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputMaxTagsExample] })],
  render: () => ({ template: '<tags-input-max-tags-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputWithFieldExample] })],
  render: () => ({ template: '<tags-input-with-field-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [TagsInputRootProviderExample] })],
  render: () => ({ template: '<tags-input-root-provider-example />' }),
}
