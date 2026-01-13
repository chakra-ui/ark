import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DisabledTabExample from './examples/disabled-tab.vue'
import IndicatorExample from './examples/indicator.vue'
import LazyMountExample from './examples/lazy-mount.vue'
import ManualActivationExample from './examples/manual-activation.vue'
import RootProviderExample from './examples/root-provider.vue'
import VerticalExample from './examples/vertical.vue'

const meta: Meta = {
  title: 'Components / Tabs',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const DisabledTab = {
  render: () => ({
    components: { Component: DisabledTabExample },
    template: '<Component />',
  }),
}

export const Indicator = {
  render: () => ({
    components: { Component: IndicatorExample },
    template: '<Component />',
  }),
}

export const LazyMount = {
  render: () => ({
    components: { Component: LazyMountExample },
    template: '<Component />',
  }),
}

export const ManualActivation = {
  render: () => ({
    components: { Component: ManualActivationExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const Vertical = {
  render: () => ({
    components: { Component: VerticalExample },
    template: '<Component />',
  }),
}
