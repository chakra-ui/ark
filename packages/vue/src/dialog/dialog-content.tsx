import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useDialogContext } from './dialog-context'

export type DialogContentProps = HTMLArkProps<'div'>

export const DialogContent: ComponentWithProps<DialogContentProps> = defineComponent({
  name: 'DialogContent',
  setup(_, { slots, attrs }) {
    const api = useDialogContext()

    return () => (
      <ark.div {...api.value.contentProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
