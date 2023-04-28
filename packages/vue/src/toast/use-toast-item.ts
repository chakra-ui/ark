import { connect, type Service } from '@zag-js/toast'
import { normalizeProps, useActor } from '@zag-js/vue'
import { computed, type UnwrapRef } from 'vue'

export type UseToastItemProps = { toast: Service }

export const useToastItem = (props: UseToastItemProps) => {
  const [state, send] = useActor(props.toast)

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseToastItemReturn = UnwrapRef<ReturnType<typeof useToastItem>>
