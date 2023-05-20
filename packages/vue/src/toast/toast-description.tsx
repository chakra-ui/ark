import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useToastItemContext } from './toast-item-context'

export type ToastDescriptionProps = HTMLArkProps<'p'>

export const ToastDescription: ComponentWithProps<ToastDescriptionProps> = defineComponent({
  name: 'ToastDescription',
  setup(_, { attrs }) {
    const api = useToastItemContext()

    return () => (
      <ark.p {...api.value.descriptionProps} {...attrs}>
        {api.value.description}
      </ark.p>
    )
  },
})
