import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseToastContext, useToastContext } from './use-toast-context'

export type ToastContextProps = SlotsType<{
  default: UnwrapRef<UseToastContext>
}>

export const ToastContext = defineComponent(
  (_, { slots }) => {
    const toast = useToastContext()

    return () => slots.default(toast.value)
  },
  {
    name: 'ToastContext',
    slots: Object as ToastContextProps,
  },
)
