import { group } from '@zag-js/toast'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, defineComponent, type ComputedRef, type PropType } from 'vue'
import { createContext } from '../context'
import type { Optional } from '../types'
import { useId, type ComponentWithProps } from '../utils'

type GroupPublicContext = Parameters<(typeof group)['machine']>[0]

export type ToastContext = ReturnType<(typeof group)['connect']>

export const [ToastContextProvider, useToast] =
  createContext<ComputedRef<ToastContext>>('ToastItemContext')

export type ToastProviderProps = Optional<GroupPublicContext, 'id'>

export const ToastProvider: ComponentWithProps<ToastProviderProps> = defineComponent({
  name: 'ToastProvider',
  props: {
    dir: {
      type: String as PropType<ToastProviderProps['dir']>,
    },
    id: {
      type: String as PropType<ToastProviderProps['id']>,
    },
    getRootNode: {
      type: Function as PropType<ToastProviderProps['getRootNode']>,
    },
    gutter: {
      type: String as PropType<ToastProviderProps['gutter']>,
      default: '1rem',
    },
    zIndex: {
      type: Number as PropType<ToastProviderProps['zIndex']>,
      default: 2147483647,
    },
    max: {
      type: Number as PropType<ToastProviderProps['max']>,
      default: Number.MAX_SAFE_INTEGER,
    },
    offsets: {
      type: [String, Object] as PropType<ToastProviderProps['offsets']>,
      default: () => ({ left: '0px', right: '0px', top: '0px', bottom: '0px' }),
    },
    pauseOnPageIdle: {
      type: Boolean as PropType<ToastProviderProps['pauseOnPageIdle']>,
    },
    pauseOnInteraction: {
      type: Boolean as PropType<ToastProviderProps['pauseOnInteraction']>,
      default: true,
    },
  },
  setup(props, { slots }) {
    const context = computed<ToastProviderProps>(() => ({
      id: props.id,
      dir: props.dir,
      getRootNode: props.getRootNode,
      gutter: props.gutter,
      max: props.max,
      offsets: props.offsets,
      pauseOnInteraction: props.pauseOnInteraction,
      pauseOnPageIdle: props.pauseOnPageIdle,
      zIndex: props.zIndex,
    }))

    const [state, send] = useMachine(
      group.machine({
        ...context.value,
        id: props.id || useId().value,
      }),
    )

    const api = computed(() => group.connect(state.value, send, normalizeProps))

    ToastContextProvider(api)

    return () => slots.default?.()
  },
})
