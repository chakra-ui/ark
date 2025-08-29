import * as asyncList from '@zag-js/async-list'
import { useMachine } from '@zag-js/solid'
import { type Accessor, createMemo } from 'solid-js'
import type { MaybeAccessor } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseAsyncListProps<T, C = string> extends asyncList.Props<T, C> {}
export interface UseAsyncListReturn<T, C = string> extends Accessor<asyncList.Api<T, C>> {}

export const useAsyncList = <T, C = string>(
  props?: MaybeAccessor<UseAsyncListProps<T, C>>,
): UseAsyncListReturn<T, C> => {
  const machineProps = createMemo(() => runIfFn(props) as asyncList.Props<T, C>)

  const service = useMachine(asyncList.machine as asyncList.Machine<T, C>, machineProps)
  return createMemo(() => asyncList.connect(service))
}
