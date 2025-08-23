import * as asyncList from '@zag-js/async-list'
import { useMachine } from '@zag-js/react'

export interface UseAsyncListProps<T, C = string> extends asyncList.Props<T, C> {}
export interface UseAsyncListReturn<T, C = string> extends asyncList.Api<T, C> {}

export function useAsyncList<T, C = string>(props: UseAsyncListProps<T, C>): UseAsyncListReturn<T, C> {
  const service = useMachine(asyncList.machine as asyncList.Machine<T, C>, props)
  return asyncList.connect(service)
}
