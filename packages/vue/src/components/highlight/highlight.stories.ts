import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ExactMatchExample from './examples/exact-match.vue'
import IgnoreCaseExample from './examples/ignore-case.vue'
import MatchAllExample from './examples/match-all.vue'
import MultipleExample from './examples/multiple.vue'
import WithInputExample from './examples/with-input.vue'

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

export const ExactMatch = {
  render: () => ({
    components: { Component: ExactMatchExample },
    template: '<Component />',
  }),
}

export const Multiple = {
  render: () => ({
    components: { Component: MultipleExample },
    template: '<Component />',
  }),
}

export const WithInput = {
  render: () => ({
    components: { Component: WithInputExample },
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
