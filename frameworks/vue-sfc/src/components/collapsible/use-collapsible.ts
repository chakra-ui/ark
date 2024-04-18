import * as collapsible from '@zag-js/collapsible'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import type { Optional } from '../../types'
import { useId } from '../../utils'
import type { UseRenderStrategyProps } from '../../utils/use-render-strategy'

export interface UseCollapsibleProps
  extends UseRenderStrategyProps,
    /** @vue-ignore */ Optional<Omit<collapsible.Context, 'open.controlled'>, 'id'> {}

export interface UseCollapsibleReturn extends ComputedRef<collapsible.Api<PropTypes>> {
  /**
   * Whether the content is unmounted
   */
  //   isUnmounted?: boolean
}

export const useCollapsible = (
  props: UseCollapsibleProps,
  emits: CallableFunction,
): UseCollapsibleReturn => {
  const context = ref(props)

  const [state, send] = useMachine(
    collapsible.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      onExitComplete: () => {
        emits('exitComplete')
      },
    }),
    { context },
  )
  return computed(() => collapsible.connect(state.value, send, normalizeProps))
}
//   const { lazyMount, unmountOnExit } = props
//   const wasVisible = useRef(false)

//   const initialContext: collapsible.Context = {
//     id: useId(),
//     getRootNode: useEnvironmentContext(),
//     ...props,
//     open: props.defaultOpen ?? props.open,
//     'open.controlled': props.open !== undefined,
//   }

//   const context: collapsible.Context = {
//     ...initialContext,
//     open: props.open,
//     onOpenChange: useEvent(props.onOpenChange, { sync: true }),
//   }

//   const [state, send] = useMachine(collapsible.machine(initialContext), { context })
//   const api = collapsible.connect(state, send, normalizeProps)

//   if (api.isVisible) {
//     wasVisible.current = true
//   }

//   const isUnmounted =
//     (!api.isVisible && !wasVisible.current && lazyMount) ||
//     (unmountOnExit && !api.isVisible && wasVisible.current)

//   return { ...api, isUnmounted }
// }
