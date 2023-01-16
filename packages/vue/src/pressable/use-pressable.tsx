import { connect, Context as PressableContext, machine } from '@zag-js/pressable'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, getCurrentInstance, reactive } from 'vue'

type PressablePropsContext = Omit<PressableContext, 'id' | 'disabled' | 'cancelOnPointerExit'> & {
  isDisabled?: PressableContext['disabled']
  isCanceledOnExit?: PressableContext['cancelOnPointerExit']
}

export type UsePressableProps = {
  context: PressablePropsContext
  emit: CallableFunction
}

export const usePressable = (props: UsePressableProps) => {
  const reactiveProps = reactive({ ...props })
  const { context, emit } = reactiveProps
  const reactiveContext = reactive(context)
  const instance = getCurrentInstance()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      disabled: reactiveContext.isDisabled,
      cancelOnPointerExit: reactiveContext.isCanceledOnExit,
      id: instance?.uid.toString() as string,
      onLongPress(event) {
        emit('longPress', event)
      },
      onPress(event) {
        emit('press', event)
      },
      onPressEnd(event) {
        emit('pressEnd', event)
      },
      onPressStart(event) {
        emit('pressStart', event)
      },
      onPressUp(event) {
        emit('pressUp', event)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return api
}

export type UsePressableReturn = ReturnType<typeof usePressable>
