import { computed, defineComponent, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { AccordionProvider } from './accordion-context'
import { useAccordion, UseAccordionProps } from './use-accordion'

const VueAccordionProps = {
  defaultValue: {
    type: String,
  },
  value: {
    type: [String, Object] as PropType<string | string[]>,
  },
  modelValue: {
    type: [String, Object] as PropType<string | string[]>,
  },
  collapsible: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
}

export interface AccordionProps extends HTMLArkProps<'div'> {
  defaultValue?: string | string[]
  value?: string | string[]
  modelValue?: string | string[]
  collapsible?: boolean
  multiple?: boolean
  disable?: boolean
}

export const Accordion: ComponentWithProps<AccordionProps> = defineComponent({
  name: 'Accordion',
  emits: ['change', 'update:modelValue'],
  props: VueAccordionProps,
  setup(props, { slots, attrs, emit }) {
    const accordionProps = computed<UseAccordionProps>(() => ({
      context: props,
      emit,
      defaultValue: props.modelValue || props.defaultValue,
    }))
    const { api } = useAccordion(accordionProps.value)
    AccordionProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots?.default?.()}
      </ark.div>
    )
  },
})
