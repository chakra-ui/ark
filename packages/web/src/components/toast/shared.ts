import * as toast from '@zag-js/toast'

export const toaster = 'ark-toaster'
export const root = 'ark-toast'

export interface ToastEntry {
  toast: toast.Options<string>
  index: number
  parent: toast.GroupService
}

// Stamped nodes aren't upgraded when `repeat` applies them, so data can't live on element properties
export const entries = new WeakMap<Element, ToastEntry>()

export interface CreateToasterProps extends toast.StoreProps {}

export const createToaster = (props: CreateToasterProps = {}): toast.Store<string> => toast.createStore(props)
