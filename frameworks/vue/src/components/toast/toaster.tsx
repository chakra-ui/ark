import * as toast from '@zag-js/toast'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { type PropType, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import type { CreateToasterReturn } from './create-toaster'

export interface ToasterProps extends HTMLArkProps<'div'> {
  toaster: CreateToasterReturn
}

export const Toaster = defineComponent<ToasterProps>(
  (props, { attrs, slots }) => {
    const [state, send] = useMachine(props.toaster.machine)
    const placement = state.value.context.placement
    const api = toast.group.connect(state.value, send, normalizeProps)
    const toastsByPlacement = api.getToastsByPlacement()
    const toasts = toastsByPlacement[placement] ?? []

    return () => <ark.div {...attrs}>{slots.default?.(toasts)}</ark.div>
  },
  {
    name: 'Toaster',
    props: {
      toaster: {
        type: Object as PropType<CreateToasterReturn>,
        required: true,
      },
    },
  },
)
