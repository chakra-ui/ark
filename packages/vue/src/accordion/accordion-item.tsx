import { computed, defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useAccordionContext } from './accordion-context'
import { AccordionItemContext, AccordionItemProvider } from './accordion-item-context'

const VueAccordionItemProps = {
  value: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

export type AccordionItemProps = AccordionItemContext & HTMLArkProps<'div'>

export const AccordionItem: ComponentWithProps<AccordionItemProps> = defineComponent({
  name: 'AccordionItem',
  props: VueAccordionItemProps,
  setup(props, { slots, attrs }) {
    const api = useAccordionContext()
    const itemProps = computed(() => ({ value: props.value, disabled: props.disabled }))
    AccordionItemProvider(itemProps.value)

    return () => (
      <ark.div {...api.value.getItemProps(itemProps.value)} {...attrs}>
        {slots?.default?.()}
      </ark.div>
    )
  },
})
