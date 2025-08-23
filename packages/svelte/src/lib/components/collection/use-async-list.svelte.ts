import type { Accessor } from '$lib/types'
import * as asyncList from '@zag-js/async-list'
import { useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseAsyncListProps<T, C = string> extends asyncList.Props<T, C> {}
export interface UseAsyncListReturn<T, C = string> extends Accessor<asyncList.Api<T, C>> {}

export const useAsyncList = <T, C = string>(
  props?: MaybeFunction<UseAsyncListProps<T, C>>,
): UseAsyncListReturn<T, C> => {
  const machineProps = $derived.by(() => runIfFn(props))

  const service = useMachine(asyncList.machine as asyncList.Machine<T, C>, () => machineProps)
  const api = $derived(asyncList.connect(service))

  return () => api
}
