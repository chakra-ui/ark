import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { type ComponentWithProps } from '../utils'
import { AccordionProvider } from './accordion-context'
import { useAccordion, type UseAccordionContext } from './use-accordion'

export type AccordionProps = Assign<HTMLArkProps<'div'>, UseAccordionContext>

const VueAccordionProps = {
  modelValue: {
    type: [String, Object] as PropType<AccordionProps['modelValue']>,
  },
  collapsible: {
    type: Boolean as PropType<AccordionProps['collapsible']>,
    default: false,
  },
  multiple: {
    type: Boolean as PropType<AccordionProps['multiple']>,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<AccordionProps['disabled']>,
    default: false,
  },
  ids: {
    type: Object as PropType<AccordionProps['ids']>,
  },
  getRootNode: {
    type: Function as PropType<AccordionProps['getRootNode']>,
  },
  orientation: {
    type: String as PropType<AccordionProps['orientation']>,
  },
}

export const Accordion: ComponentWithProps<AccordionProps> = defineComponent({
  name: 'Accordion',
  emits: ['change', 'update:modelValue'],
  props: VueAccordionProps,
  setup(props, { slots, attrs, emit }) {
    console.log('🚀 ~ file: accordion.tsx:42 ~ setup ~ props:', props)
    const { api } = useAccordion(emit, props)
    AccordionProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots?.default?.()}
      </ark.div>
    )
  },
})
