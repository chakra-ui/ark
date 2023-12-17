import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverTitleProps extends HTMLArkProps<'div'> {}

export const PopoverTitle = defineComponent({
  name: 'PopoverTitle',
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <ark.div {...api.value.titleProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
