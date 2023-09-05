import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import { getValidChildren } from '../utils'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionContentProps = HTMLArkProps<'div'> & PresenceProps

export const AccordionContent = defineComponent({
  name: 'AccordionContent',
  props,
  emits,
  setup(props, { slots, attrs }) {
    const api = useAccordionContext()
    const { value, isOpen } = useAccordionItemContext()

    return () => (
      <Presence {...props} present={props.present !== undefined ? props.present : isOpen}>
        <ark.div {...api.value.getContentProps({ value })} {...attrs}>
          {() => getValidChildren(slots)}
        </ark.div>
      </Presence>
    )
  },
})
