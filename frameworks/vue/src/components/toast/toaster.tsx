import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useToastContext } from './toast-context'

export interface ToasterProps extends HTMLArkProps<'div'> {}

export const Toaster = defineComponent<ToasterProps>(
  (_, { attrs, slots }) => {
    const api = useToastContext()

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'Toaster',
  },
)
