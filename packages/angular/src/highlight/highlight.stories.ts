import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { HighlightBasicExample } from './examples/basic'
import { HighlightDynamicQueryExample } from './examples/dynamic-query'
import { HighlightExactMatchExample } from './examples/exact-match'
import { HighlightIgnoreCaseExample } from './examples/ignore-case'
import { HighlightMatchAllExample } from './examples/match-all'
import { HighlightMultipleExample } from './examples/multiple'
import { HighlightRepeatingTextExample } from './examples/repeating-text'

const meta: Meta = {
  title: 'Utilities / Highlight',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [HighlightBasicExample] })],
  render: () => ({ template: '<highlight-basic-example />' }),
}

export const DynamicQuery: StoryObj = {
  decorators: [moduleMetadata({ imports: [HighlightDynamicQueryExample] })],
  render: () => ({ template: '<highlight-dynamic-query-example />' }),
}

export const ExactMatch: StoryObj = {
  decorators: [moduleMetadata({ imports: [HighlightExactMatchExample] })],
  render: () => ({ template: '<highlight-exact-match-example />' }),
}

export const IgnoreCase: StoryObj = {
  decorators: [moduleMetadata({ imports: [HighlightIgnoreCaseExample] })],
  render: () => ({ template: '<highlight-ignore-case-example />' }),
}

export const MatchAll: StoryObj = {
  decorators: [moduleMetadata({ imports: [HighlightMatchAllExample] })],
  render: () => ({ template: '<highlight-match-all-example />' }),
}

export const Multiple: StoryObj = {
  decorators: [moduleMetadata({ imports: [HighlightMultipleExample] })],
  render: () => ({ template: '<highlight-multiple-example />' }),
}

export const RepeatingText: StoryObj = {
  decorators: [moduleMetadata({ imports: [HighlightRepeatingTextExample] })],
  render: () => ({ template: '<highlight-repeating-text-example />' }),
}
