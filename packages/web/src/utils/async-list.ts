import * as asyncList from '@zag-js/async-list'
import { VanillaMachine } from '@zag-js/vanilla'

export type AsyncListProps<T, C = string> = asyncList.Props<T, C>

export interface AsyncList<T, C = string> extends asyncList.Api<T, C> {
  /**
   * Calls the listener after each change, and returns a function that unsubscribes it
   */
  subscribe: (listener: (list: AsyncList<T, C>) => void) => VoidFunction
  /**
   * Stops the list, aborting any pending load
   */
  destroy: VoidFunction
}

export function createAsyncList<T, C = string>(props: AsyncListProps<T, C>): AsyncList<T, C> {
  const machine = new VanillaMachine(asyncList.machine as asyncList.Machine<T, C>, props)
  const api = () => asyncList.connect(machine.service)
  const list = {
    subscribe: (listener) => machine.subscribe(() => listener(list)),
    destroy: () => machine.stop(),
  } as AsyncList<T, C>
  for (const key of Object.keys(api()) as (keyof asyncList.Api<T, C>)[]) {
    Object.defineProperty(list, key, { enumerable: true, get: () => api()[key] })
  }
  machine.start()
  return list
}
