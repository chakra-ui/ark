import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useSelectContext } from './select-context'

export interface SelectPositionerProps extends HTMLArkProps<'div'> {}

export const SelectPositioner = defineComponent({
  name: 'SelectPositioner',
  setup(_, { slots, attrs }) {
    const api = useSelectContext()
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
})
