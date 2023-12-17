import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerPositionerProps extends HTMLArkProps<'div'> {}

export const DatePickerPositioner = defineComponent({
  name: 'DatePickerPositioner',
  setup(_, { attrs, slots }) {
    const api = useDatePickerContext()

    // if (presenceApi.isUnmounted) {
    //   return null
    // }

    return () => (
      <ark.div {...api.value.positionerProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
