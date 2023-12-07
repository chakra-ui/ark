import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'

export type ToastGroupProps = HTMLArkProps<'ol'>

export const ToastGroup = defineComponent({
  name: 'ToastGroup',
  setup(_, { attrs }) {
    return () => <ark.ol {...attrs} />
  },
})
