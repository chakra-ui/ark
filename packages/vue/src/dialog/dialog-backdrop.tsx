import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
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
