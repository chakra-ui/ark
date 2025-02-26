import * as toast from '@zag-js/toast'
import { normalizeProps, useMachine } from '@zag-js/vue'
import {
  type HTMLAttributes,
  type PropType,
  type SlotsType,
  type VNodeChild,
  computed,
  defineComponent,
  useId,
} from 'vue'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import { type PolymorphicProps, ark } from '../factory'
import type { CreateToasterReturn } from './create-toaster'
import { ToastProvider } from './use-toast-context'

export interface ToasterBaseProps extends PolymorphicProps {}
export interface ToasterProps extends ToasterBaseProps, HTMLAttributes {
  toaster: CreateToasterReturn
}

export const Toaster = defineComponent<ToasterProps>(
  (props, { attrs, slots }) => {
    const locale = useLocaleContext()
    const env = useEnvironmentContext()

    const service = useMachine(toast.group.machine, {
      store: props.toaster,
      id: useId(),
      dir: locale?.value.dir,
      getRootNode: env?.value.getRootNode,
    })

    const api = computed(() => toast.group.connect(service, normalizeProps))

    return () => (
      <ark.div {...api.value.getGroupProps()} {...attrs}>
        {api.value.getToasts().map((toast, index) => (
          <ToastItem value={toast} key={toast.id} parent={service} index={index}>
            {(toast: toast.Options<VNodeChild>) => slots.default?.(toast)}
          </ToastItem>
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

interface ToastItemProps {
  value: toast.Props
  index: number
  parent: toast.GroupService
}

const ToastItem = defineComponent<ToastItemProps>(
  (props, { slots }) => {
    const machineProps = computed(() => ({
      ...props.value,
      index: props.index,
      parent: props.parent,
    }))
    const service = useMachine(toast.machine, machineProps.value)
    const api = computed(() => toast.connect(service, normalizeProps))

    ToastProvider(api)
    return () => slots.default?.(props.value)
  },
  {
    name: 'ToastItem',
    props: {
      value: {
        type: Object as PropType<toast.Props<VNodeChild>>,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      },
      parent: {
        type: Object as PropType<toast.GroupService>,
        required: true,
      },
    },
  },
)
