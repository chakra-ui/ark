import { action } from '@storybook/addon-actions'
import type { Meta } from '@storybook/vue3'

import type { EmitHandlers } from '../../../.storybook/storybook.types'

import type { AccordionRootEmits } from './accordion-root.vue'
import type { AccordionProps } from './examples/accordion.vue'

import AccordionExample from './examples/accordion.vue'
import BasicExample from './examples/basic.vue'
import CollapsibleExample from './examples/collapsible.vue'
import ContextFocusedValueExample from './examples/context/focusedValue.vue'
import ContextGetItemStateExample from './examples/context/getItemState.vue'
import ContextSetValueExample from './examples/context/setValue.vue'
import ContextValueExample from './examples/context/value.vue'
import ControlledExample from './examples/controlled.vue'
import DisabledExample from './examples/disabled.vue'
import HorizontalExample from './examples/horizontal.vue'
import MultipleExample from './examples/multiple.vue'
import RenderPropExample from './examples/render-prop.vue'
import RootProviderExample from './examples/root-provider.vue'
import VerticalExample from './examples/vertical.vue'

const meta = {
  title: 'Components / Accordion',
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

export const Collapsible = {
  render: () => ({
    components: { CollapsibleExample },
    template: '<CollapsibleExample />',
  }),
}

export const Multiple = {
  render: () => ({
    components: { MultipleExample },
    template: '<MultipleExample />',
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

export const Horizontal = {
  render: () => ({
    components: { HorizontalExample },
    template: '<HorizontalExample />',
  }),
}

export const Disabled = {
  render: () => ({
    components: { DisabledExample },
    template: '<DisabledExample />',
  }),
}

interface ClosedArgs {
  props: AccordionProps
  emits: EmitHandlers<AccordionRootEmits>
}

export const Closed = {
  render: (args: ClosedArgs) => ({
    components: { AccordionExample },
    setup() {
      return {
        args,
      }
    },
    template: `<AccordionExample v-bind="args.props" v-on="args.emits" />`,
  }),
  args: {
    props: {
      items: ['React', 'Solid', 'Vue'],
      multiple: true,
    },
    emits: {
      focusChange: (details) => action('focus changed')(details),
      valueChange: (details) => action('value changed')(details),
      'update:modelValue': (value) => action('model value updated')(value),
    },
  } satisfies ClosedArgs,
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}

export const ContextFocusedValue = {
  render: () => ({
    components: { ContextFocusedValueExample },
    template: '<ContextFocusedValueExample />',
  }),
}

export const ContextValue = {
  render: () => ({
    components: { ContextValueExample },
    template: '<ContextValueExample />',
  }),
}

export const ContextSetValue = {
  render: () => ({
    components: { ContextSetValueExample },
    template: '<ContextSetValueExample />',
  }),
}

export const ContextGetItemState = {
  render: () => ({
    components: { ContextGetItemStateExample },
    template: '<ContextGetItemStateExample />',
  }),
}
