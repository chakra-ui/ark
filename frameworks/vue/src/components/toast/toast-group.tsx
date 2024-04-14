import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'

export interface ToastGroupProps extends HTMLArkProps<'ol'> {}

export const ToastGroup = defineComponent<ToastGroupProps>(
  (_, { attrs, slots }) => {
    return () => <ark.ol {...attrs}>{slots.default?.()}</ark.ol>
  },
  {
    name: 'ToastGroup',
  },
)
