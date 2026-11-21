import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/listbox/basic.js'
import { mount as ControlledExample } from '../../../examples/listbox/controlled.js'
import { mount as DisabledItemExample } from '../../../examples/listbox/disabled-item.js'
import { mount as ExtendedSelectExample } from '../../../examples/listbox/extended-select.js'
import { mount as FilteringExample } from '../../../examples/listbox/filtering.js'
import { mount as GridExample } from '../../../examples/listbox/grid.js'
import { mount as GroupExample } from '../../../examples/listbox/group.js'
import { mount as HorizontalExample } from '../../../examples/listbox/horizontal.js'
import { mount as LoadMoreExample } from '../../../examples/listbox/load-more.js'
import { mount as MultipleExample } from '../../../examples/listbox/multiple.js'
import { mount as SelectAllExample } from '../../../examples/listbox/select-all.js'
import { mount as ValueTextExample } from '../../../examples/listbox/value-text.js'
import { mount as VirtualizedExample } from '../../../examples/listbox/virtualized.js'

const meta: Meta = { title: 'Components / Listbox' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const DisabledItem: StoryObj = { name: 'Disabled Item', render: renderExample(DisabledItemExample) }

export const ExtendedSelect: StoryObj = { name: 'Extended Select', render: renderExample(ExtendedSelectExample) }

export const Filtering: StoryObj = { name: 'Filtering', render: renderExample(FilteringExample) }

export const Grid: StoryObj = { name: 'Grid', render: renderExample(GridExample) }

export const Group: StoryObj = { name: 'Group', render: renderExample(GroupExample) }

export const Horizontal: StoryObj = { name: 'Horizontal', render: renderExample(HorizontalExample) }

export const Multiple: StoryObj = { name: 'Multiple', render: renderExample(MultipleExample) }

export const SelectAll: StoryObj = { name: 'Select All', render: renderExample(SelectAllExample) }

export const ValueText: StoryObj = { name: 'Value Text', render: renderExample(ValueTextExample) }

export const LoadMore: StoryObj = { name: 'Load More', render: renderExample(LoadMoreExample) }

export const Virtualized: StoryObj = { name: 'Virtualized', render: renderExample(VirtualizedExample) }
