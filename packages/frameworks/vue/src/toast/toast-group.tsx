import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'

export interface ToastGroupProps extends HTMLArkProps<'ol'> {}

export const ToastGroup = defineComponent({
  name: 'ToastGroup',
  setup(_, { attrs, slots }) {
    return () => <ark.ol {...attrs}>{slots.default?.()}</ark.ol>
  },
})
