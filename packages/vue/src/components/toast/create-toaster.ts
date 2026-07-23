import * as toast from '@zag-js/toast'
import type { VNodeChild } from 'vue'
import type { Optional } from '../../types.ts'

export interface CreateToasterProps extends Optional<Partial<toast.StoreProps>, 'placement'> {
  placement: toast.Placement
}

export type CreateToasterReturn<T = VNodeChild> = toast.Store<T>

export const createToaster = <T = VNodeChild>(props: CreateToasterProps): CreateToasterReturn<T> => {
  return toast.createStore(props)
}
