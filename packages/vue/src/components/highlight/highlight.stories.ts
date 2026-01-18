import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import DynamicQueryExample from './examples/dynamic-query.vue'
import ExactMatchExample from './examples/exact-match.vue'
import IgnoreCaseExample from './examples/ignore-case.vue'
import MatchAllExample from './examples/match-all.vue'
import MultipleExample from './examples/multiple.vue'
import RepeatingTextExample from './examples/repeating-text.vue'

const meta: Meta = {
  title: 'Components / Highlight',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const DynamicQuery = {
  render: () => ({
    components: { Component: DynamicQueryExample },
    template: '<Component />',
  }),
}

export const ExactMatch = {
  render: () => ({
    components: { Component: ExactMatchExample },
    template: '<Component />',
  }),
}

export const IgnoreCase = {
  render: () => ({
    components: { Component: IgnoreCaseExample },
    template: '<Component />',
  }),
}

export const MatchAll = {
  render: () => ({
    components: { Component: MatchAllExample },
    template: '<Component />',
  }),
}

export const Multiple = {
  render: () => ({
    components: { Component: MultipleExample },
    template: '<Component />',
  }),
}

export const RepeatingText = {
  render: () => ({
    components: { Component: RepeatingTextExample },
    template: '<Component />',
  }),
}
