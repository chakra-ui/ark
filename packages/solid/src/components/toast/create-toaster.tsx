import * as toast from '@zag-js/toast'
import type { JSX } from 'solid-js'

export interface CreateToasterProps extends Partial<toast.StoreProps> {
  placement: toast.Placement
}

export type CreateToasterReturn<T = JSX.Element> = toast.Store<T>

export const createToaster = <T = JSX.Element,>(props: CreateToasterProps): CreateToasterReturn<T> => {
  return toast.createStore(props)
}
