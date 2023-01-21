import { computed, defineComponent, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { AccordionProvider } from './accordion-context'
import { useAccordion, UseAccordionProps } from './use-accordion'

type UseAccordionPropsContext = UseAccordionProps['context']

export interface AccordionProps extends HTMLArkProps<'div'>, UseAccordionPropsContext {
  defaultValue?: UseAccordionProps['defaultValue']
}

const VueAccordionProps = {
  defaultValue: {
    type: String as PropType<AccordionProps['defaultValue']>,
  },
  value: {
    type: [String, Object] as PropType<AccordionProps['value']>,
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
