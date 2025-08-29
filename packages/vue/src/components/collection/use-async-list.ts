import * as asyncList from '@zag-js/async-list'
import { useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue } from 'vue'
import { cleanProps } from '../../utils'

export interface UseAsyncListProps<T, C = string> extends asyncList.Props<T, C> {}
export interface UseAsyncListReturn<T, C = string> extends ComputedRef<asyncList.Api<T, C>> {}

export const useAsyncList = <T, C = string>(
  props: MaybeRef<UseAsyncListProps<T, C>> = {} as UseAsyncListProps<T, C>,
): UseAsyncListReturn<T, C> => {
  const context = computed(() => cleanProps(toValue<UseAsyncListProps<T, C>>(props)))
  const service = useMachine(asyncList.machine as asyncList.Machine<T, C>, context)
  return computed(() => asyncList.connect(service))
}
