import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as AsyncSearchExample } from './examples/async-search.js'
import { mount as AutoHighlightExample } from './examples/auto-highlight.js'
import { mount as BasicExample } from './examples/basic.js'
import { mount as CreatableExample } from './examples/creatable.js'
import { mount as CustomObjectExample } from './examples/custom-object.js'
import { mount as DynamicExample } from './examples/dynamic.js'
import { mount as FromJsonExample } from './examples/from-json.js'
import { mount as GroupingExample } from './examples/grouping.js'
import { mount as HighlightMatchingTextExample } from './examples/highlight-matching-text.js'
import { mount as InlineAutocompleteExample } from './examples/inline-autocomplete.js'
import { mount as LimitResultsExample } from './examples/limit-results.js'
import { mount as LinksExample } from './examples/links.js'
import { mount as MultipleExample } from './examples/multiple.js'
import { mount as TextareaMentionExample } from './examples/textarea-mention.js'
import { mount as VirtualizedExample } from './examples/virtualized.js'
import { mount as WithFieldExample } from './examples/with-field.js'

const meta: Meta = { title: 'Components / Combobox' }
export default meta

export const AutoHighlight: StoryObj = { name: 'Auto Highlight', render: renderExample(AutoHighlightExample) }

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Creatable: StoryObj = { name: 'Creatable', render: renderExample(CreatableExample) }

export const CustomObject: StoryObj = { name: 'Custom Object', render: renderExample(CustomObjectExample) }

export const Dynamic: StoryObj = { name: 'Dynamic', render: renderExample(DynamicExample) }

export const FromJson: StoryObj = { name: 'From Json', render: renderExample(FromJsonExample) }

export const Grouping: StoryObj = { name: 'Grouping', render: renderExample(GroupingExample) }

export const HighlightMatchingText: StoryObj = {
  name: 'Highlight Matching Text',
  render: renderExample(HighlightMatchingTextExample),
}

export const InlineAutocomplete: StoryObj = {
  name: 'Inline Autocomplete',
  render: renderExample(InlineAutocompleteExample),
}

export const LimitResults: StoryObj = { name: 'Limit Results', render: renderExample(LimitResultsExample) }

export const Links: StoryObj = { name: 'Links', render: renderExample(LinksExample) }

export const Multiple: StoryObj = { name: 'Multiple', render: renderExample(MultipleExample) }

export const WithField: StoryObj = { name: 'With Field', render: renderExample(WithFieldExample) }

export const AsyncSearch: StoryObj = { name: 'Async Search', render: renderExample(AsyncSearchExample) }

export const Virtualized: StoryObj = { name: 'Virtualized', render: renderExample(VirtualizedExample) }

export const TextareaMention: StoryObj = { name: 'Textarea Mention', render: renderExample(TextareaMentionExample) }
