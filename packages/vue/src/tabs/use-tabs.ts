import { connect, machine, type Context as TabsContext } from '@zag-js/tabs'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useId } from '../utils'

export type UseTabsContext = Omit<TabsContext, 'id' | 'value'>

export type UseTabsDefaultValue = TabsContext['value']

export const useTabs = (
  emit: CallableFunction,
  context: UseTabsContext,
  defaultValue?: UseTabsDefaultValue,
) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      value: defaultValue,
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

  const api = computed(() => connect(state.value, send, normalizeProps))

  return api
}

export type UseTabsReturn = ReturnType<typeof useTabs>
