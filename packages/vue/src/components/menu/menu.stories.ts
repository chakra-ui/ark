import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import CheckboxExample from './examples/checkbox.vue'
import ContextExample from './examples/context.vue'
import ControlledExample from './examples/controlled.vue'
import GroupExample from './examples/group.vue'
import NestedExample from './examples/nested.vue'
import RadioGroupExample from './examples/radio-group.vue'
import RenderPropExample from './examples/render-prop.vue'
import RootProviderExample from './examples/root-provider.vue'
import SeparatorExample from './examples/separator.vue'

const meta = {
  title: 'Components / Menu',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { ControlledExample },
    template: '<ControlledExample />',
  }),
}

export const Group = {
  render: () => ({
    components: { GroupExample },
    template: '<GroupExample />',
  }),
}

export const Separator = {
  render: () => ({
    components: { SeparatorExample },
    template: '<SeparatorExample />',
  }),
}

export const Context = {
  render: () => ({
    components: { ContextExample },
    template: '<ContextExample />',
  }),
}

export const RenderProp = {
  render: () => ({
    components: { RenderPropExample },
    template: '<RenderPropExample />',
  }),
}

export const Nested = {
  render: () => ({
    components: { NestedExample },
    template: '<NestedExample />',
  }),
}

export const Checkbox = {
  render: () => ({
    components: { CheckboxExample },
    template: '<CheckboxExample />',
  }),
}

export const RadioGroup = {
  render: () => ({
    components: { RadioGroupExample },
    template: '<RadioGroupExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}