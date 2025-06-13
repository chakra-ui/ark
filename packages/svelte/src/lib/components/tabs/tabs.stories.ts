import type { Meta } from '@storybook/svelte'
import Basic from './examples/basic.svelte'
import Controlled from './examples/controlled.svelte'
import Indicator from './examples/indicator.svelte'
import RootProvider from './examples/root-provider.svelte'

const meta = {
  title: 'Components / Tabs',
} as Meta

export default meta

export const BasicStory = {
  name: 'Basic',
  render: () => ({
    Component: Basic,
  }),
}

export const ControlledStory = {
  name: 'Controlled',
  render: () => ({
    Component: Controlled,
  }),
}

export const IndicatorStory = {
  name: 'Indicator',
  render: () => ({
    Component: Indicator,
  }),
}

export const RootProviderStory = {
  name: 'Root Provider',
  render: () => ({
    Component: RootProvider,
  }),
}
