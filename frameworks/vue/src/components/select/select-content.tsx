import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { type PresenceProps, usePresenceContext } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useSelectContext } from './use-select-context'

export interface SelectContentProps extends Assign<HTMLArkProps<'div'>, PresenceProps> {}

export const SelectContent = defineComponent<SelectContentProps>(
  (_, { slots, attrs }) => {
    const api = useSelectContext()
    const presenceApi = usePresenceContext()

    return () =>
      presenceApi.value.unmounted ? null : (
        <ark.div {...api.value.contentProps} {...presenceApi.value.presenceProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'SelectContent',
    props,
    emits,
  },
)
