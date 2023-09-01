import { mergeProps } from '@zag-js/vue'
import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { AccordionProvider } from './accordion-context'
import { emits, props } from './accordion.props'
import { useAccordion, type UseAccordionProps } from './use-accordion'

export type AccordionProps = HTMLArkProps<'div'> & UseAccordionProps

export const Accordion = defineComponent({
  name: 'Accordion',
  props,
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = useAccordion(props, emit)
    AccordionProvider(api)
    const mergedProps = computed(() => mergeProps(api.value.rootProps, attrs))

    return () => <ark.div {...mergedProps.value}>{slots?.default?.(api.value)}</ark.div>
  },
})
