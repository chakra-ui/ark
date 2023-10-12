import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './toast-context'

export type ToastTitleProps = HTMLArkProps<'div'>

export const ToastTitle = defineComponent({
  name: 'ToastTitle',
  setup(_, { attrs }) {
    const api = useToastContext()
    console.log({ api })

    return () => (
      <ark.div {...api.value.titleProps} {...attrs}>
        {api.value.title}
      </ark.div>
    )
  },
})
