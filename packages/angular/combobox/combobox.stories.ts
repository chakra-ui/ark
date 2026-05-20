import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ComboboxAsyncSearchExample } from './examples/async-search'
import { ComboboxAutoHighlightExample } from './examples/auto-highlight'
import { ComboboxBasicExample } from './examples/basic'
import { ComboboxContextExample } from './examples/context'
import { ComboboxCreatableExample } from './examples/creatable'
import { ComboboxCustomObjectExample } from './examples/custom-object'
import { ComboboxDynamicExample } from './examples/dynamic'
import { ComboboxGroupingExample } from './examples/grouping'
import { ComboboxHighlightMatchingTextExample } from './examples/highlight-matching-text'
import { ComboboxInlineAutocompleteExample } from './examples/inline-autocomplete'
import { ComboboxLimitResultsExample } from './examples/limit-results'
import { ComboboxLinksExample } from './examples/links'
import { ComboboxMultipleExample } from './examples/multiple'
import { ComboboxRehydrateValueExample } from './examples/rehydrate-value'
import { ComboboxRootProviderExample } from './examples/root-provider'
import { ComboboxVirtualizedExample } from './examples/virtualized'
import { ComboboxWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / Combobox',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxBasicExample] })],
  render: () => ({ template: '<combobox-basic-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxContextExample] })],
  render: () => ({ template: '<combobox-context-example />' }),
}

export const Grouping: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxGroupingExample] })],
  render: () => ({ template: '<combobox-grouping-example />' }),
}

export const Links: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxLinksExample] })],
  render: () => ({ template: '<combobox-links-example />' }),
}

export const Multiple: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxMultipleExample] })],
  render: () => ({ template: '<combobox-multiple-example />' }),
}

export const RehydrateValue: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxRehydrateValueExample] })],
  render: () => ({ template: '<combobox-rehydrate-value-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxRootProviderExample] })],
  render: () => ({ template: '<combobox-root-provider-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxWithFieldExample] })],
  render: () => ({ template: '<combobox-with-field-example />' }),
}

export const Creatable: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxCreatableExample] })],
  render: () => ({ template: '<combobox-creatable-example />' }),
}

export const LimitResults: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxLimitResultsExample] })],
  render: () => ({ template: '<combobox-limit-results-example />' }),
}

export const HighlightMatchingText: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxHighlightMatchingTextExample] })],
  render: () => ({ template: '<combobox-highlight-matching-text-example />' }),
}

export const Dynamic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxDynamicExample] })],
  render: () => ({ template: '<combobox-dynamic-example />' }),
}

export const CustomObject: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxCustomObjectExample] })],
  render: () => ({ template: '<combobox-custom-object-example />' }),
}

export const AsyncSearch: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxAsyncSearchExample] })],
  render: () => ({ template: '<combobox-async-search-example />' }),
}

export const Virtualized: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxVirtualizedExample] })],
  render: () => ({ template: '<combobox-virtualized-example />' }),
}

export const AutoHighlight: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxAutoHighlightExample] })],
  render: () => ({ template: '<combobox-auto-highlight-example />' }),
}

export const InlineAutocomplete: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxInlineAutocompleteExample] })],
  render: () => ({ template: '<combobox-inline-autocomplete-example />' }),
}
