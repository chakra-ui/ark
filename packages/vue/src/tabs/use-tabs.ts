import { connect, Context as TabsContext, machine } from '@zag-js/tabs'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useId } from '../utils'

export type UseTabsProps = {
  context: Omit<TabsContext, 'id' | 'value'>
  defaultValue?: TabsContext['value']
  emit: CallableFunction
}

export const useTabs = (props: UseTabsProps) => {
  const emit = props.emit
  const defaultValue = props.defaultValue
  const reactiveContext = reactive(props.context)
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
