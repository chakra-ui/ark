import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import IgnoreCaseExample from './examples/ignore-case.svelte'
import MatchAllExample from './examples/match-all.svelte'

const meta = {
  title: 'Components / Highlight',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const IgnoreCase = {
  render: () => ({
    Component: IgnoreCaseExample,
  }),
}

export const MatchAll = {
  render: () => ({
    Component: MatchAllExample,
  }),
}
