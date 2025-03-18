import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import IgnoreCaseExample from './examples/ignore-case.vue'
import MatchAllExample from './examples/match-all.vue'
import MultipleExample from './examples/multiple.vue'
import WithInputExample from './examples/with-input.vue'

const meta = {
  title: 'Highlight',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Multiple = {
  render: () => ({
    components: { MultipleExample },
    template: '<MultipleExample />',
  }),
}

export const WithInput = {
  render: () => ({
    components: { WithInputExample },
    template: '<WithInputExample />',
  }),
}

export const IgnoreCase = {
  render: () => ({
    components: { IgnoreCaseExample },
    template: '<IgnoreCaseExample />',
  }),
}

export const MatchAll = {
  render: () => ({
    components: { MatchAllExample },
    template: '<MatchAllExample />',
  }),
}