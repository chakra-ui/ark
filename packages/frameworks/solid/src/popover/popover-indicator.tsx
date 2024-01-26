import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverIndicatorProps extends HTMLArkProps<'div'> {}

export const PopoverIndicator: ArkComponent<'div'> = (props) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(() => popover().indicatorProps, props)

  return <ark.div {...mergedProps} />
}
