import { defineComponent, watch } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export interface AccordionItemContentProps extends HTMLArkProps<'div'> {}

export const AccordionItemContent = defineComponent({
  name: 'AccordionItemContent',
  props,
  emits,
  setup(props, { slots, attrs }) {
    const api = useAccordionContext()
    const item = useAccordionItemContext()
    const presenceApi = usePresenceContext()

    watch(presenceApi, (newValue) => {
      console.log('accordion-item-content', newValue)
    })

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.getItemContentProps(item.value)} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
})
