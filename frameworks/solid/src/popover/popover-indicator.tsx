import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverIndicatorProps extends HTMLArkProps<'div'> {}

export const PopoverIndicator = (props: PopoverIndicatorProps) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(() => popover().indicatorProps, props)

  return <ark.div {...mergedProps} />
}
