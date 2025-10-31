import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import CheckboxExample from './examples/checkbox.vue'
import ContextExample from './examples/context.vue'
import ControlledExample from './examples/controlled.vue'
import GroupExample from './examples/group.vue'
import LinksExample from './examples/links.vue'
import NestedExample from './examples/nested.vue'
import RadioGroupExample from './examples/radio-group.vue'
import RenderPropExample from './examples/render-prop.vue'
import RootProviderExample from './examples/root-provider.vue'
import SelectEventExample from './examples/select-event.vue'
import SeparatorExample from './examples/separator.vue'

const meta: Meta = {
  title: 'Components / Menu',
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

export const Group = {
  render: () => ({
    components: { Component: GroupExample },
    template: '<Component />',
  }),
}

export const Links = {
  render: () => ({
    components: { Component: LinksExample },
    template: '<Component />',
  }),
}

export const Separator = {
  render: () => ({
    components: { Component: SeparatorExample },
    template: '<Component />',
  }),
}

export const Context = {
  render: () => ({
    components: { Component: ContextExample },
    template: '<Component />',
  }),
}

export const RenderProp = {
  render: () => ({
    components: { Component: RenderPropExample },
    template: '<Component />',
  }),
}

export const Nested = {
  render: () => ({
    components: { Component: NestedExample },
    template: '<Component />',
  }),
}

export const Checkbox = {
  render: () => ({
    components: { Component: CheckboxExample },
    template: '<Component />',
  }),
}

export const RadioGroup = {
  render: () => ({
    components: { Component: RadioGroupExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const SelectEvent = {
  render: () => ({
    components: { Component: SelectEventExample },
    template: '<Component />',
  }),
}
