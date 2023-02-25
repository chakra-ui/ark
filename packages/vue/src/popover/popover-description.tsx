import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { usePopoverContext } from './popover-context'

export type PopoverDescriptionProps = HTMLArkProps<'div'>

export const PopoverDescription: ComponentWithProps<PopoverDescriptionProps> = defineComponent({
  name: 'PopoverDescription',
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <ark.div {...api.value.descriptionProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
