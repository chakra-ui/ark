import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import DisabledItemExample from './examples/disabled-item.svelte'
import ExtendedSelectExample from './examples/extended-select.svelte'
import FilteringExample from './examples/filtering.svelte'
import GridExample from './examples/grid.svelte'
import GroupExample from './examples/group.svelte'
import HorizontalExample from './examples/horizontal.svelte'
import MultipleExample from './examples/multiple.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import SelectAllExample from './examples/select-all.svelte'
import ValueTextExample from './examples/value-text.svelte'

const meta: Meta = {
  title: 'Components / Listbox',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const DisabledItem = {
  render: () => ({
    Component: DisabledItemExample,
  }),
}

export const ExtendedSelect = {
  render: () => ({
    Component: ExtendedSelectExample,
  }),
}

export const Filtering = {
  render: () => ({
    Component: FilteringExample,
  }),
}

export const Grid = {
  render: () => ({
    Component: GridExample,
  }),
}

export const Group = {
  render: () => ({
    Component: GroupExample,
  }),
}

export const Horizontal = {
  render: () => ({
    Component: HorizontalExample,
  }),
}

export const Multiple = {
  render: () => ({
    Component: MultipleExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const SelectAll = {
  render: () => ({
    Component: SelectAllExample,
  }),
}

export const ValueText = {
  render: () => ({
    Component: ValueTextExample,
  }),
}
