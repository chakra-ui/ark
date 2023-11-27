import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { usePopoverContext } from './popover-context'

export type PopoverPositionerProps = HTMLArkProps<'div'>

export const PopoverPositioner: ComponentWithProps<PopoverPositionerProps> = defineComponent({
  name: 'PopoverPositioner',
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <ark.div {...api.value.positionerProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
