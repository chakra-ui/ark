import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { AccordionProvider } from './accordion-context'
import { useAccordion, type UseAccordionProps } from './use-accordion'

export type AccordionProps = Assign<HTMLArkProps<'div'>, UseAccordionProps>

const VueAccordionProps = createVueProps<AccordionProps>({
  id: {
    type: String as PropType<AccordionProps['id']>,
  },
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
  defaultValue: {
    type: [String, Object] as PropType<AccordionProps['defaultValue']>,
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
})

export const Accordion: ComponentWithProps<AccordionProps> = defineComponent({
  name: 'Accordion',
  emits: ['change', 'update:modelValue'],
  props: VueAccordionProps,
  setup(props, { slots, attrs, emit }) {
    const api = useAccordion(emit, props)
    AccordionProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots?.default?.(api.value)}
      </ark.div>
    )
  },
})
