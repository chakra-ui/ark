import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ListboxBasicExample } from './examples/basic'
import { ListboxControlledExample } from './examples/controlled'
import { ListboxDisabledItemExample } from './examples/disabled-item'
import { ListboxExtendedSelectExample } from './examples/extended-select'
import { ListboxFilteringExample } from './examples/filtering'
import { ListboxGridExample } from './examples/grid'
import { ListboxGroupExample } from './examples/group'
import { ListboxHorizontalExample } from './examples/horizontal'
import { ListboxMultipleExample } from './examples/multiple'
import { ListboxRootProviderExample } from './examples/root-provider'
import { ListboxSelectAllExample } from './examples/select-all'
import { ListboxValueTextExample } from './examples/value-text'

const meta: Meta = {
  title: 'Components / Listbox',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxBasicExample] })],
  render: () => ({ template: '<listbox-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxControlledExample] })],
  render: () => ({ template: '<listbox-controlled-example />' }),
}

export const DisabledItem: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxDisabledItemExample] })],
  render: () => ({ template: '<listbox-disabled-item-example />' }),
}

export const ExtendedSelect: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxExtendedSelectExample] })],
  render: () => ({ template: '<listbox-extended-select-example />' }),
}

export const Filtering: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxFilteringExample] })],
  render: () => ({ template: '<listbox-filtering-example />' }),
}

export const Grid: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxGridExample] })],
  render: () => ({ template: '<listbox-grid-example />' }),
}

export const Group: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxGroupExample] })],
  render: () => ({ template: '<listbox-group-example />' }),
}

export const Horizontal: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxHorizontalExample] })],
  render: () => ({ template: '<listbox-horizontal-example />' }),
}

export const Multiple: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxMultipleExample] })],
  render: () => ({ template: '<listbox-multiple-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxRootProviderExample] })],
  render: () => ({ template: '<listbox-root-provider-example />' }),
}

export const SelectAll: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxSelectAllExample] })],
  render: () => ({ template: '<listbox-select-all-example />' }),
}

export const ValueText: StoryObj = {
  decorators: [moduleMetadata({ imports: [ListboxValueTextExample] })],
  render: () => ({ template: '<listbox-value-text-example />' }),
}
