import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useDialogContext } from './dialog-context'

export type DialogTitleProps = HTMLArkProps<'h2'>

export const DialogTitle: ComponentWithProps<DialogTitleProps> = defineComponent({
  name: 'DialogTitle',
  setup(_, { slots, attrs }) {
    const api = useDialogContext()

    return () => (
      <ark.h2 {...api.value.titleProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.h2>
    )
  },
})
