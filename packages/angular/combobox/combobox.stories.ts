import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ComboboxAutoHighlightExample } from './examples/auto-highlight'
import { ComboboxBasicExample } from './examples/basic'
import { ComboboxControlledExample } from './examples/controlled'
import { ComboboxCustomObjectExample } from './examples/custom-object'
import { ComboboxDynamicExample } from './examples/dynamic'
import { ComboboxFilterableExample } from './examples/filterable'
import { ComboboxGroupingExample } from './examples/grouping'
import { ComboboxInlineAutocompleteExample } from './examples/inline-autocomplete'
import { ComboboxLimitResultsExample } from './examples/limit-results'
import { ComboboxLinksExample } from './examples/links'
import { ComboboxMultipleExample } from './examples/multiple'
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

export const LimitResults: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxLimitResultsExample] })],
  render: () => ({ template: '<combobox-limit-results-example />' }),
}

export const Dynamic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxDynamicExample] })],
  render: () => ({ template: '<combobox-dynamic-example />' }),
}

export const CustomObject: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxCustomObjectExample] })],
  render: () => ({ template: '<combobox-custom-object-example />' }),
}

export const AutoHighlight: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxAutoHighlightExample] })],
  render: () => ({ template: '<combobox-auto-highlight-example />' }),
}

export const InlineAutocomplete: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxInlineAutocompleteExample] })],
  render: () => ({ template: '<combobox-inline-autocomplete-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxWithFieldExample] })],
  render: () => ({ template: '<combobox-with-field-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [ComboboxRootProviderExample] })],
  render: () => ({ template: '<combobox-root-provider-example />' }),
}
