import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useDialogContext } from './dialog-context'

export type DialogContainerProps = HTMLArkProps<'div'>

export const DialogContainer: ComponentWithProps<DialogContainerProps> = defineComponent({
  name: 'DialogContainer',
  setup(_, { slots, attrs }) {
    const api = useDialogContext()

    return () => (
      <ark.div {...api.value.containerProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
