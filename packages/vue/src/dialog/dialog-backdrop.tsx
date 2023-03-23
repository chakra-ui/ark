import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useDialogContext } from './dialog-context'

export type DialogBackdropProps = HTMLArkProps<'div'>

export const DialogBackdrop: ComponentWithProps<DialogBackdropProps> = defineComponent({
  name: 'DialogBackdrop',
  setup(_, { slots, attrs }) {
    const api = useDialogContext()

    return () => (
      <ark.div {...api.value.backdropProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
