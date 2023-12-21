import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverDescriptionProps extends HTMLArkProps<'p'> {}

export const PopoverDescription = defineComponent({
  name: 'PopoverDescription',
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <ark.p {...api.value.descriptionProps} {...attrs}>
        {slots.default?.()}
      </ark.p>
    )
  },
})
