import type { Meta } from '@storybook/svelte'
import Basic from './examples/basic.svelte'
import Svg from './examples/svg.svelte'
import WithPromise from './examples/with-promise.svelte'

const meta = {
  title: 'Components / Download Trigger',
} as Meta

export default meta

export const BasicStory = {
  name: 'Basic',
  render: () => ({
    Component: Basic,
  }),
}

export const SvgStory = {
  name: 'Svg',
  render: () => ({
    Component: Svg,
  }),
}

export const WithPromiseStory = {
  name: 'With Promise',
  render: () => ({
    Component: WithPromise,
  }),
}
