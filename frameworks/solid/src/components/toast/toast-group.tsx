import { type HTMLArkProps, ark } from '../../factory'

export interface ToastGroupProps extends HTMLArkProps<'ol'> {}

export const ToastGroup = (props: ToastGroupProps) => {
  return <ark.ol {...props} />
}
