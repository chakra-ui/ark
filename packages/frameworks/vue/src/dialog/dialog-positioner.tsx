import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useDialogContext } from './dialog-context'

export type DialogPositionerProps = HTMLArkProps<'div'>

export const DialogPositioner: ComponentWithProps<DialogPositionerProps> = defineComponent({
  name: 'DialogPositioner',
  setup(_, { slots, attrs }) {
    const api = useDialogContext()

    return () => (
      <ark.div {...api.value.positionerProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
