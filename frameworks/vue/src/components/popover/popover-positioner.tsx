import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

export interface PopoverPositionerProps extends HTMLArkProps<'div'> {}

export const PopoverPositioner = defineComponent<PopoverPositionerProps>(
  (_, { slots, attrs }) => {
    const api = usePopoverContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.positionerProps} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'PopoverPositioner',
  },
)
