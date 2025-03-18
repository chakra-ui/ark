import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import EventsExample from './examples/events.vue'
import RenderPropExample from './examples/render-prop.vue'
import RootProviderExample from './examples/root-provider.vue'
import VerticalExample from './examples/vertical.vue'

const meta = {
  title: 'Components / Splitter',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const RenderProp = {
  render: () => ({
    components: { RenderPropExample },
    template: '<RenderPropExample />',
  }),
}

export const Events = {
  render: () => ({
    components: { EventsExample },
    template: '<EventsExample />',
  }),
}

export const Vertical = {
  render: () => ({
    components: { VerticalExample },
    template: '<VerticalExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}