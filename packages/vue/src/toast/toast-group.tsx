import type { Placement, Service } from '@zag-js/toast'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import type { ComponentWithProps } from '../utils'
import { useToast } from './toast-provider'

export type ToastsContext = { toasts: Service[] }

export type ToastGroupProps = Assign<HTMLArkProps<'div'>, { placement: Placement }>

export const ToastGroup: ComponentWithProps<ToastGroupProps> = defineComponent({
  name: 'ToastGroup',
  props: {
    placement: {
      type: String as PropType<ToastGroupProps['placement']>,
      required: true,
    },
  },
  setup(props, { slots, attrs, expose }) {
    const api = useToast()

    const toastsByPlacement = computed(() => api.value.toastsByPlacement[props.placement])

    expose({ toasts: toastsByPlacement })

    return () => (
      <ark.div {...api.value.getGroupProps({ placement: props.placement })} {...attrs}>
        {slots.default?.({ toasts: toastsByPlacement.value })}
      </ark.div>
    )
  },
})
