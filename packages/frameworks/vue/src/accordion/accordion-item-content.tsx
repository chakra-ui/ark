import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import { getValidChildren } from '../utils'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export interface AccordionItemContentProps extends HTMLArkProps<'div'>, PresenceProps {}

export const AccordionItemContent = defineComponent({
  name: 'AccordionItemContent',
  props,
  emits,
  setup(props, { slots, attrs }) {
    const api = useAccordionContext()
    const item = useAccordionItemContext()

    return () => (
      <Presence
        {...props}
        present={props.present !== undefined ? props.present : item.value.isOpen}
      >
        <ark.div {...api.value.getItemContentProps(item.value)} {...attrs}>
          {() => getValidChildren(slots)}
        </ark.div>
      </Presence>
    )
  },
})
