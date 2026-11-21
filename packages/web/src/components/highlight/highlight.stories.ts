import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/highlight/basic.js'
import { mount as DynamicQueryExample } from '../../../examples/highlight/dynamic-query.js'
import { mount as ExactMatchExample } from '../../../examples/highlight/exact-match.js'
import { mount as IgnoreCaseExample } from '../../../examples/highlight/ignore-case.js'
import { mount as MatchAllExample } from '../../../examples/highlight/match-all.js'
import { mount as MultipleExample } from '../../../examples/highlight/multiple.js'
import { mount as RepeatingTextExample } from '../../../examples/highlight/repeating-text.js'

const meta: Meta = { title: 'Components / Highlight' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const DynamicQuery: StoryObj = { name: 'Dynamic Query', render: renderExample(DynamicQueryExample) }

export const IgnoreCase: StoryObj = { name: 'Ignore Case', render: renderExample(IgnoreCaseExample) }

export const MatchAll: StoryObj = { name: 'Match All', render: renderExample(MatchAllExample) }

export const ExactMatch: StoryObj = { name: 'Exact Match', render: renderExample(ExactMatchExample) }

export const Multiple: StoryObj = { name: 'Multiple', render: renderExample(MultipleExample) }

export const RepeatingText: StoryObj = { name: 'Repeating Text', render: renderExample(RepeatingTextExample) }
