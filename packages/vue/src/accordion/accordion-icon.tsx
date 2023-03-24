import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'

export type AccordionIconProps = HTMLArkProps<'div'>

export const AccordionIcon = defineComponent<AccordionIconProps>({
  name: 'AccordionIcon',
  setup(_, { slots, attrs }) {
    return () => <ark.div {...attrs}>{slots?.default?.()}</ark.div>
  },
})
