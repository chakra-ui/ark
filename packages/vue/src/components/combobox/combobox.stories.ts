import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import GroupingExample from './examples/grouping.vue'
import LinksExample from './examples/links.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithFieldExample from './examples/with-field.vue'

const meta = {
  title: 'Components / Combobox',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Grouping = {
  render: () => ({
    components: { GroupingExample },
    template: '<GroupingExample />',
  }),
}

export const Links = {
  render: () => ({
    components: { LinksExample },
    template: '<LinksExample />',
  }),
}

export const WithField = {
  render: () => ({
    components: { WithFieldExample },
    template: '<WithFieldExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { ControlledExample },
    template: '<ControlledExample />',
  }),
}
