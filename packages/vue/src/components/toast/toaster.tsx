import * as toast from '@zag-js/toast'
import { normalizeProps, useActor, useMachine } from '@zag-js/vue'
import {
  type HTMLAttributes,
  type PropType,
  type SlotsType,
  type VNodeChild,
  computed,
  defineComponent,
} from 'vue'
import { type PolymorphicProps, ark } from '../factory'
import type { CreateToasterReturn } from './create-toaster'
import { ToastProvider } from './use-toast-context'

export interface ToasterBaseProps extends PolymorphicProps {}
export interface ToasterProps extends ToasterBaseProps, HTMLAttributes {
  toaster: CreateToasterReturn
}

export const Toaster = defineComponent<ToasterProps>(
  (props, { attrs, slots }) => {
    const [state, send] = useMachine(props.toaster.machine)
    const placement = state.value.context.placement
    const toaster = computed(() => toast.group.connect(state.value, send, normalizeProps))

    return () => (
      <ark.div {...toaster.value.getGroupProps({ placement })} {...attrs}>
        {toaster.value.getToastsByPlacement(placement).map((toast) => (
          <ToastActor value={toast} key={toast.id}>
            {(toast: toast.Options<VNodeChild>) => slots.default?.(toast)}
          </ToastActor>
        ))}
      </ark.div>
    )
  },
  {
    name: 'Toaster',
    props: {
      toaster: {
        type: Object as PropType<CreateToasterReturn>,
        required: true,
      },
    },
    slots: Object as SlotsType<{
      default: toast.Options<VNodeChild>
    }>,
  },
)

interface ToastActorProps {
  value: toast.Service<VNodeChild>
}

const ToastActor = defineComponent<ToastActorProps>(
  (props, { slots }) => {
    const [state, send] = useActor(props.value)
    const api = computed(() => toast.connect(state.value, send, normalizeProps))

    ToastProvider(api)
    return () => slots.default?.(state.value.context)
  },
  {
    name: 'ToastActor',
    props: {
      value: {
        type: Object as PropType<toast.Service<VNodeChild>>,
        required: true,
      },
    },
  },
)
