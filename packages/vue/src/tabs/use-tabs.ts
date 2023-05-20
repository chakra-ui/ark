import { connect, machine } from '@zag-js/tabs'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'
import type { TabsContext } from './tabs'

export const useTabs = <T extends ExtractPropTypes<TabsContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
      getRootNode,
      value: reactiveContext.defaultValue,
      onChange(details) {
        emit('change', details)
      },
      onFocus(details) {
        emit('focus', details)
      },
      onDelete(details) {
        emit('delete', details)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseTabsReturn = ReturnType<typeof useTabs>
