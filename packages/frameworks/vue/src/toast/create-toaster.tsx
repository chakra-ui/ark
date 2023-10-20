import * as toast from '@zag-js/toast'
import { normalizeProps, useActor, type PropTypes } from '@zag-js/vue'
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  toRef,
  type ComputedRef,
  type PropType,
  type VNode,
} from 'vue'
import { useEnvironmentContext } from '../environment'
import { ark } from '../factory'
import type { Optional } from '../types'
import { ToastProvider } from './toast-context'

// TODO simplify types after next zag.js upgrade
type GroupContext = Parameters<(typeof toast)['group']['machine']>[0]

export interface CreateToasterProps extends Omit<Optional<GroupContext, 'id'>, 'render'> {
  placement: toast.Placement
  render: (api: toast.Api<PropTypes>) => VNode
}

// TODO improve typings
export type CreateToasterReturn = [any, ComputedRef<toast.GroupApi<PropTypes>>]

export const createToaster = (props: CreateToasterProps): CreateToasterReturn => {
  const { placement, ...rest } = props
  const service = toast.group.machine({ id: '1', placement, ...rest }).start()
  let api = computed(() => toast.group.connect(service.getState(), service.send, normalizeProps))

  const Toaster = defineComponent({
    name: 'Toaster',
    setup(_, { attrs }) {
      const [state, send] = useActor(service)
      api = computed(() => toast.group.connect(state.value, send, normalizeProps))
      const getRootNode = useEnvironmentContext()

      onMounted(() => {
        service.setContext({ getRootNode })
      })
      onUnmounted(() => {
        service.stop()
      })

      return () => (
        <ark.ol {...api.value.getGroupProps({ placement })} {...attrs}>
          {(api.value.toastsByPlacement[placement] ?? []).map((toast) => (
            <ToastProviderFactory key={toast.id} service={toast} />
          ))}
        </ark.ol>
      )
    },
  })

  return [Toaster, api]
}

export const ToastProviderFactory = defineComponent({
  name: 'ToastProviderFactory',
  props: {
    service: { type: Object as PropType<toast.Service>, required: true },
  },
  setup(props) {
    const service = toRef(props, 'service')
    const [state, send] = useActor(service.value)
    const api = computed(() => toast.connect(state.value, send, normalizeProps))

    ToastProvider(api)

    return () => <>{state.value.context.render?.(api.value)}</>
  },
})
