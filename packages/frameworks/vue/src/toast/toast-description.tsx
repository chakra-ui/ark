import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './toast-context'

export type ToastDescriptionProps = HTMLArkProps<'div'>

export const ToastDescription = defineComponent({
  name: 'ToastDescription',
  setup(_, { attrs }) {
    const api = useToastContext()

    return () => (
      <ark.div {...api.value.descriptionProps} {...attrs}>
        {api.value.description}
      </ark.div>
    )
  },
})
