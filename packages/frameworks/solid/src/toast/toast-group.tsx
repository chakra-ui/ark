import { ark, type ArkComponent, type HTMLArkProps } from '../factory'

export interface ToastGroupProps extends HTMLArkProps<'ol'> {}

export const ToastGroup: ArkComponent<'ol'> = (props) => {
  return <ark.ol {...props} />
}
