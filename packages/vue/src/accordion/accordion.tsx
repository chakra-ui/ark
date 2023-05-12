import { type Context } from '@zag-js/accordion'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign, type Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { AccordionProvider } from './accordion-context'
import { useAccordion } from './use-accordion'

export type AccordionContext = Context & { modelValue?: AccordionContext['value'] }

export type UseAccordionProps = Assign<HTMLArkProps<'div'>, AccordionContext>

const VueAccordionProps = createVueProps<UseAccordionProps>({
  id: {
    type: String as PropType<UseAccordionProps['id']>,
  },
  modelValue: {
    type: [String, Object] as PropType<UseAccordionProps['modelValue']>,
  },
  collapsible: {
    type: Boolean as PropType<UseAccordionProps['collapsible']>,
    default: false,
  },
  multiple: {
    type: Boolean as PropType<UseAccordionProps['multiple']>,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<UseAccordionProps['disabled']>,
    default: false,
  },
  ids: {
    type: Object as PropType<UseAccordionProps['ids']>,
  },
  getRootNode: {
    type: Function as PropType<UseAccordionProps['getRootNode']>,
  },
  orientation: {
    type: String as PropType<UseAccordionProps['orientation']>,
  },
})

export const Accordion: ComponentWithProps<Partial<UseAccordionProps>> = defineComponent({
  name: 'Accordion',
  emits: ['change', 'update:modelValue'],
  props: VueAccordionProps,
  setup(props, { slots, attrs, emit }) {
    console.log('🚀 ~ file: accordion.tsx:42 ~ setup ~ props:', props)
    const { api } = useAccordion(emit, props)
    AccordionProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots?.default?.(api.value)}
      </ark.div>
    )
  },
})

export type AccordionProps = Optional<AccordionContext, 'id'>
