import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { SelectAsyncExample } from './examples/async'
import { SelectBasicExample } from './examples/basic'
import { SelectControlledExample } from './examples/controlled'
import { SelectFormLibraryExample } from './examples/form-library'
import { SelectFullyControlledExample } from './examples/fully-controlled'
import { SelectGroupingExample } from './examples/grouping'
import { SelectLazyMountExample } from './examples/lazy-mount'
import { SelectMaxSelectedExample } from './examples/max-selected'
import { SelectMultipleExample } from './examples/multiple'
import { SelectOverflowExample } from './examples/overflow'
import { SelectReactiveCollectionExample } from './examples/reactive-collection'
import { SelectRootProviderExample } from './examples/root-provider'
import { SelectAllExample } from './examples/select-all'
import { SelectOnHighlightExample } from './examples/select-on-highlight'
import { SelectWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / Select',
}

export default meta

export const Async: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectAsyncExample] })],
  render: () => ({ template: '<select-async-example />' }),
}

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectBasicExample] })],
  render: () => ({ template: '<select-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectControlledExample] })],
  render: () => ({ template: '<select-controlled-example />' }),
}

export const FormLibrary: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectFormLibraryExample] })],
  render: () => ({ template: '<select-form-library-example />' }),
}

export const FullyControlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectFullyControlledExample] })],
  render: () => ({ template: '<select-fully-controlled-example />' }),
}

export const Grouping: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectGroupingExample] })],
  render: () => ({ template: '<select-grouping-example />' }),
}

export const LazyMount: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectLazyMountExample] })],
  render: () => ({ template: '<select-lazy-mount-example />' }),
}

export const MaxSelected: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectMaxSelectedExample] })],
  render: () => ({ template: '<select-max-selected-example />' }),
}

export const Multiple: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectMultipleExample] })],
  render: () => ({ template: '<select-multiple-example />' }),
}

export const Overflow: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectOverflowExample] })],
  render: () => ({ template: '<select-overflow-example />' }),
}

export const ReactiveCollection: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectReactiveCollectionExample] })],
  render: () => ({ template: '<select-reactive-collection-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectRootProviderExample] })],
  render: () => ({ template: '<select-root-provider-example />' }),
}

export const SelectAll: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectAllExample] })],
  render: () => ({ template: '<select-all-example />' }),
}

export const SelectOnHighlight: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectOnHighlightExample] })],
  render: () => ({ template: '<select-on-highlight-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [SelectWithFieldExample] })],
  render: () => ({ template: '<select-with-field-example />' }),
}
