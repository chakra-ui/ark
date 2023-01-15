import { connect, Context, machine } from '@zag-js/tabs'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, getCurrentInstance, reactive } from 'vue'

export type UseTabsProps = {
  context: Omit<Context, 'id' | 'value'>
  defaultValue?: Context['value']
  emit: CallableFunction
}

export const useTabs = (props: UseTabsProps) => {
  const reactiveProps = reactive(props)
  const { context, defaultValue, emit } = reactiveProps
  const reactiveContext = reactive(context)
  const instance = getCurrentInstance()
  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: instance?.uid.toString() as string,
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
