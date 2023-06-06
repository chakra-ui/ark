import { connect, machine, type Context } from '@zag-js/tabs'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseTabsContext = Optional<Context, 'id'> & {
  defaultValue?: Context['value']
}

export const useTabs = <T extends ExtractPropTypes<UseTabsContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const machineContext = computed(() => ({
    ...context,
    value: context.value || context.defaultValue,
  }))

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...machineContext.value,
      id: machineContext.value.id || useId().value,
      getRootNode,
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
    { context: machineContext },
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseTabsReturn = ReturnType<typeof useTabs>
