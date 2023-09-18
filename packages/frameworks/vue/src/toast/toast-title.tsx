import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useToastItemContext } from './toast-item-context'

export type ToastTitleProps = HTMLArkProps<'h3'>

export const ToastTitle: ComponentWithProps<ToastTitleProps> = defineComponent({
  name: 'ToastTitle',
  setup(_, { attrs }) {
    const api = useToastItemContext()

    return () => (
      <ark.h3 {...api.value.titleProps} {...attrs}>
        {api.value.title}
      </ark.h3>
    )
  },
})
