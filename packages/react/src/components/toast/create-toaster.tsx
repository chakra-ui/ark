import * as toast from '@zag-js/toast'

export interface CreateToasterProps extends toast.ToastStoreProps {}

export interface CreateToasterReturn extends toast.ToastStore {}

export const createToaster = (props: toast.ToastStoreProps): toast.ToastStore => {
  return toast.createStore(props)
}
