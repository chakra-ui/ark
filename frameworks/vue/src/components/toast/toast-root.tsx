import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastRootProps extends HTMLArkProps<'div'> {}

export const ToastRoot = defineComponent<ToastRootProps>(
  (_, { attrs, slots }) => {
    const toast = useToastContext()

    return () => (
      <ark.div {...toast.value.rootProps} {...attrs}>
        <div {...toast.value.ghostBeforeProps} />
        {slots.default?.()}
        <div {...toast.value.ghostAfterProps} />
      </ark.div>
    )
  },
  {
    name: 'ToastRoot',
  },
)
