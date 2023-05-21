import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { type ComponentWithProps } from '../utils'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

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

export type AccordionItemProps = Assign<HTMLArkProps<'div'>, { value: string; disabled?: boolean }>

export const AccordionItem: ComponentWithProps<AccordionItemProps> = defineComponent({
  name: 'AccordionItem',
  props: VueAccordionItemProps,
  setup(props, { slots, attrs }) {
    const api = useAccordionContext()
    const itemState = computed(() =>
      api.value.getItemState({ value: props.value, disabled: props.disabled }),
    )
    const itemProps = computed(() => ({
      value: props.value,
      disabled: props.disabled,
      ...itemState.value,
    }))
    AccordionItemProvider(itemProps.value)

    return () => (
      <ark.div {...api.value.getItemProps(itemProps.value)} {...attrs}>
        {slots?.default?.(itemState.value)}
      </ark.div>
    )
  },
})
