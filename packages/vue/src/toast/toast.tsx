import { computed, defineComponent, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ComponentWithProps, getValidChildren } from '../utils'
import { ToastItemProvider } from './toast-item-context'
import { useToastItem, UseToastItemProps } from './use-toast-item'

export type ToastProps = Assign<HTMLArkProps<'div'>, UseToastItemProps>

export const Toast: ComponentWithProps<ToastProps> = defineComponent({
  name: 'Toast',
  props: {
    toast: {
      type: Object as PropType<ToastProps['toast']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const toastItemProps = computed<UseToastItemProps>(() => ({
      toast: props.toast,
    }))

    const api = useToastItem(toastItemProps.value)

    ToastItemProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
