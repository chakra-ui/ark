import * as toast from '@zag-js/toast'
import { normalizeProps, useActor, type PropTypes } from '@zag-js/vue'
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  type Component,
  type ComputedRef,
  type PropType,
  type VNode,
} from 'vue'
import { useEnvironmentContext } from '../environment'
import type { HTMLArkProps } from '../factory'
import type { Optional } from '../types'
import { ToastProvider } from './toast-context'
import { ToastGroup } from './toast-group'

type GroupContext = Partial<toast.GroupMachineContext>

export interface CreateToasterProps extends Omit<Optional<GroupContext, 'id'>, 'render'> {
  placement: toast.Placement
  render: (api: toast.Api<PropTypes>) => VNode
}

export type CreateToasterReturn = [Component, ComputedRef<toast.GroupApi<PropTypes>>]

export const createToaster = (props: CreateToasterProps): CreateToasterReturn => {
  const { placement, ...rest } = props
  const service = toast.group.machine({ id: '1', placement, ...rest }).start()
  let api = computed(() => toast.group.connect(service.getState(), service.send, normalizeProps))

  const Toaster = defineComponent<HTMLArkProps<'ol'>>(
    (_, { attrs }) => {
      const getRootNode = useEnvironmentContext()
      const [state, send] = useActor(service)
      api = computed(() => toast.group.connect(state.value, send, normalizeProps))

      onMounted(() => {
        service.setContext({ getRootNode })
      })
      onUnmounted(() => {
        service.stop()
      })

      return () => (
        <ToastGroup {...api.value.getGroupProps({ placement })} {...attrs}>
          {(api.value.toastsByPlacement[placement] ?? []).map((toast) => (
            <ToastProviderFactory key={toast.id} service={toast} />
          ))}
        </ToastGroup>
      )
    },
    {
      name: 'Toaster',
    },
  )

  return [Toaster, api]
}

export const ToastProviderFactory = defineComponent({
  name: 'ToastProviderFactory',
  props: {
    service: { type: Object as PropType<toast.Service>, required: true },
  },
  setup(props) {
    const [state, send] = useActor(props.service)
    const api = computed(() => toast.connect(state.value, send, normalizeProps))

    ToastProvider(api)

    return () => state.value.context.render?.(api.value)
  },
})
