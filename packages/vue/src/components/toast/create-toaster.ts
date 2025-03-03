import * as toast from '@zag-js/toast'
import type { VNodeChild } from 'vue'
import type { Optional } from '../../types'

export interface CreateToasterProps extends Optional<Partial<toast.StoreProps>, 'placement'> {
  placement: toast.Placement
}

export interface CreateToasterReturn extends toast.Store<VNodeChild> {}

export const createToaster = (props: CreateToasterProps): CreateToasterReturn => {
  return toast.createStore(props)
}
