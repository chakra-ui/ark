import * as toast from '@zag-js/toast'
import { normalizeProps, useActor, type PropTypes } from '@zag-js/vue'
import {
  Fragment,
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

export interface CreateToasterProps extends Omit<Optional<GroupContext, 'id'>, 'defaultOptions'> {
  placement: toast.Placement
  // TODO improve typings
  render: (api: any) => VNode
}

// TODO improve typings
export type CreateToasterReturn = [any, ComputedRef<toast.GroupApi<PropTypes>>]

export const createToaster = (props: CreateToasterProps): CreateToasterReturn => {
  const { placement, render, ...rest } = props
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
            <ToastProviderFactory key={toast.id} toast={toast} render={render} />
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
    toast: { type: Object as PropType<toast.Service>, required: true },
    render: { type: Function as PropType<CreateToasterProps['render']>, required: true },
  },
  setup(props) {
    const toastRef = toRef(props, 'toast')
    const [state, send] = useActor(toastRef.value)
    const api = computed(() => toast.connect(state.value, send, normalizeProps))

    ToastProvider(api)

    return () => <Fragment>{props.render(api)}</Fragment>
  },
})
