import type { connect } from '@zag-js/accordion'
import { ComputedRef, defineComponent, PropType } from 'vue'
import { createContext } from '../context'
import { ark, HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useAccordion } from './use-accordion'

export const [AccordionProvider, useAccordionContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('AccordionContext')

const AccordionProps = {
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

export interface AccordionPropType extends HTMLArkProps<'div'> {
  defaultValue?: string | string[]
  value?: string | string[]
  modelValue?: string | string[]
  collapsible?: boolean
  multiple?: boolean
  disable?: boolean
}

export const Accordion: ComponentWithProps<AccordionPropType> = defineComponent({
  name: 'Accordion',
  emits: ['change', 'update:modelValue'],
  props: AccordionProps,
  setup(props, { slots, attrs, emit }) {
    const { api } = useAccordion(props, emit, props.modelValue || props.defaultValue)
    AccordionProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots?.default?.()}
      </ark.div>
    )
  },
})
