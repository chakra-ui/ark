import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DisabledItemExample from './examples/disabled-item.vue'
import ExtendedSelectExample from './examples/extended-select.vue'
import FilteringExample from './examples/filtering.vue'
import GridExample from './examples/grid.vue'
import GroupExample from './examples/group.vue'
import HorizontalExample from './examples/horizontal.vue'
import MultipleExample from './examples/multiple.vue'
import RootProviderExample from './examples/root-provider.vue'
import SelectAllExample from './examples/select-all.vue'
import ValueTextExample from './examples/value-text.vue'

const meta: Meta = {
  title: 'Components / Listbox',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const DisabledItem = {
  render: () => ({
    components: { Component: DisabledItemExample },
    template: '<Component />',
  }),
}

export const ExtendedSelect = {
  render: () => ({
    components: { Component: ExtendedSelectExample },
    template: '<Component />',
  }),
}

export const Filtering = {
  render: () => ({
    components: { Component: FilteringExample },
    template: '<Component />',
  }),
}

export const Grid = {
  render: () => ({
    components: { Component: GridExample },
    template: '<Component />',
  }),
}

export const Group = {
  render: () => ({
    components: { Component: GroupExample },
    template: '<Component />',
  }),
}

export const Horizontal = {
  render: () => ({
    components: { Component: HorizontalExample },
    template: '<Component />',
  }),
}

export const Multiple = {
  render: () => ({
    components: { Component: MultipleExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const SelectAll = {
  render: () => ({
    components: { Component: SelectAllExample },
    template: '<Component />',
  }),
}

export const ValueText = {
  render: () => ({
    components: { Component: ValueTextExample },
    template: '<Component />',
  }),
}
