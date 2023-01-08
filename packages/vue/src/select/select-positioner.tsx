import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useSelectContext } from './select-context'

export type SelectPositionerProps = HTMLArkProps<'div'>

export const SelectPositioner: ComponentWithProps<SelectPositionerProps> = defineComponent({
  name: 'SelectPositioner',
  setup(_, { slots, attrs }) {
    const api = useSelectContext()

    return () => (
      <ark.div {...api.value.positionerProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
