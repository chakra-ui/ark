import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export interface SelectContentProps extends Assign<HTMLArkProps<'div'>, PresenceProps> {}

export const SelectContent = defineComponent<SelectContentProps>(
  (_, { slots, attrs }) => {
    const api = useSelectContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.contentProps} {...presenceApi.value.presenceProps} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'SelectContent',
    props,
    emits,
  },
)
