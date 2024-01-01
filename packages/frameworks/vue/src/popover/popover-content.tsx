import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import { usePopoverContext } from './popover-context'

export interface PopoverContentProps extends HTMLArkProps<'div'>, PresenceProps {}

export const PopoverContent = defineComponent<PopoverContentProps>(
  (_, { slots, attrs }) => {
    const api = usePopoverContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.contentProps} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'PopoverContent',
    props,
    emits,
  },
)
