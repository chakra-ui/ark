import { type Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { ToastItemProvider } from './toast-item-context'
import { useToastItem, type UseToastItemProps } from './use-toast-item'

export type ToastProps = Assign<HTMLArkProps<'div'>, UseToastItemProps>

export const Toast = (props: ToastProps) => {
  const [useToastItemProps, divProps] = createSplitProps<UseToastItemProps>()(props, ['toast'])
  const toast = useToastItem(useToastItemProps)

  return (
    <ToastItemProvider value={toast}>
      <ark.div {...toast().rootProps} {...divProps} />
    </ToastItemProvider>
  )
}
