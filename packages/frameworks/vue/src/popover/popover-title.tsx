import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { usePopoverContext } from './popover-context'

export type PopoverTitleProps = HTMLArkProps<'div'>

export const PopoverTitle: ComponentWithProps<PopoverTitleProps> = defineComponent({
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
