import { computed, defineComponent } from 'vue'
import { createContext } from '../context'
import { ark, HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useAccordionContext } from './accordion'

interface AccordionItemContext {
  value: string
  disabled?: boolean
}

export const [AccordionItemProvider, useAccordionItemContext] =
  createContext<AccordionItemContext>('AccordionItemContext')

const AccordionItemProps = {
  value: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

export const AccordionItem: ComponentWithProps<AccordionItemContext & HTMLArkProps<'div'>> =
  defineComponent({
    props: AccordionItemProps,
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
