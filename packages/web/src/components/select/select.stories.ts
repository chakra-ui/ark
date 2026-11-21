import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as AlignItemWithTriggerExample } from '../../../examples/select/align-item-with-trigger.js'
import { mount as BasicExample } from '../../../examples/select/basic.js'
import { mount as ControlledExample } from '../../../examples/select/controlled.js'
import { mount as CustomObjectExample } from '../../../examples/select/custom-object.js'
import { mount as DynamicItemsExample } from '../../../examples/select/dynamic-items.js'
import { mount as FormUsageExample } from '../../../examples/select/form-usage.js'
import { mount as FromJsonExample } from '../../../examples/select/from-json.js'
import { mount as GroupingExample } from '../../../examples/select/grouping.js'
import { mount as LazyMountExample } from '../../../examples/select/lazy-mount.js'
import { mount as MaxSelectedExample } from '../../../examples/select/max-selected.js'
import { mount as MultipleExample } from '../../../examples/select/multiple.js'
import { mount as OverflowExample } from '../../../examples/select/overflow.js'
import { mount as SelectAllExample } from '../../../examples/select/select-all.js'
import { mount as SelectOnHighlightExample } from '../../../examples/select/select-on-highlight.js'
import { mount as ShadowRootExample } from '../../../examples/select/shadow-root.js'
import { mount as VirtualizedExample } from '../../../examples/select/virtualized.js'
import { mount as WithFieldExample } from '../../../examples/select/with-field.js'

const meta: Meta = { title: 'Components / Select' }
export default meta

export const AlignItemWithTrigger: StoryObj = {
  name: 'Align Item With Trigger',
  render: renderExample(AlignItemWithTriggerExample),
}

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const DynamicItems: StoryObj = { name: 'Dynamic Items', render: renderExample(DynamicItemsExample) }

export const FormUsage: StoryObj = { name: 'Form Usage', render: renderExample(FormUsageExample) }

export const FromJson: StoryObj = { name: 'From Json', render: renderExample(FromJsonExample) }

export const Grouping: StoryObj = { name: 'Grouping', render: renderExample(GroupingExample) }

export const LazyMount: StoryObj = { name: 'Lazy Mount', render: renderExample(LazyMountExample) }

export const MaxSelected: StoryObj = { name: 'Max Selected', render: renderExample(MaxSelectedExample) }

export const Multiple: StoryObj = { name: 'Multiple', render: renderExample(MultipleExample) }

export const Overflow: StoryObj = { name: 'Overflow', render: renderExample(OverflowExample) }

export const SelectAll: StoryObj = { name: 'Select All', render: renderExample(SelectAllExample) }

export const SelectOnHighlight: StoryObj = {
  name: 'Select On Highlight',
  render: renderExample(SelectOnHighlightExample),
}

export const ShadowRoot: StoryObj = { name: 'Shadow Root', render: renderExample(ShadowRootExample) }

export const WithField: StoryObj = { name: 'With Field', render: renderExample(WithFieldExample) }

export const CustomObject: StoryObj = { name: 'Custom Object', render: renderExample(CustomObjectExample) }

export const Virtualized: StoryObj = { name: 'Virtualized', render: renderExample(VirtualizedExample) }
