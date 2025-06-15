import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DisabledTabExample from './examples/disabled-tab.vue'
import IndicatorExample from './examples/indicator.vue'
import InitialTabExample from './examples/initial-tab.vue'
import LazyMountExample from './examples/lazy-mount.vue'
import ManualExample from './examples/manual.vue'
import RootProviderExample from './examples/root-provider.vue'
import VerticalExample from './examples/vertical.vue'

const meta = {
  title: 'Components / Tabs',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const InitialTab = {
  render: () => ({
    components: { InitialTabExample },
    template: '<InitialTabExample />',
  }),
}

export const Indicator = {
  render: () => ({
    components: { IndicatorExample },
    template: '<IndicatorExample />',
  }),
}

export const LazyMount = {
  render: () => ({
    components: { LazyMountExample },
    template: '<LazyMountExample />',
  }),
}

export const DisabledTab = {
  render: () => ({
    components: { DisabledTabExample },
    template: '<DisabledTabExample />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { ControlledExample },
    template: '<ControlledExample />',
  }),
}

export const Vertical = {
  render: () => ({
    components: { VerticalExample },
    template: '<VerticalExample />',
  }),
}

export const Manual = {
  render: () => ({
    components: { ManualExample },
    template: '<ManualExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}