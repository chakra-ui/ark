import type { Meta } from '@storybook/svelte'
import Basic from './examples/basic.svelte'
import Controlled from './examples/controlled.svelte'
import DisabledTab from './examples/disabled-tab.svelte'
import Indicator from './examples/indicator.svelte'
import LazyMount from './examples/lazy-mount.svelte'
import ManualActivation from './examples/manual-activation.svelte'
import RootProvider from './examples/root-provider.svelte'
import Vertical from './examples/vertical.svelte'

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

export const DisabledTabStory = {
  name: 'Disabled Tab',
  render: () => ({
    Component: DisabledTab,
  }),
}

export const IndicatorStory = {
  name: 'Indicator',
  render: () => ({
    Component: Indicator,
  }),
}

export const LazyMountStory = {
  name: 'Lazy Mount',
  render: () => ({
    Component: LazyMount,
  }),
}

export const ManualActivationStory = {
  name: 'Manual Activation',
  render: () => ({
    Component: ManualActivation,
  }),
}

export const VerticalStory = {
  name: 'Vertical',
  render: () => ({
    Component: Vertical,
  }),
}

export const RootProviderStory = {
  name: 'Root Provider',
  render: () => ({
    Component: RootProvider,
  }),
}
