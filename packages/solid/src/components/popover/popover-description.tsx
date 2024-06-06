import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverDescriptionProps extends HTMLArkProps<'div'> {}

export const PopoverDescription = (props: PopoverDescriptionProps) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(() => api().getDescriptionProps(), props)

  return <ark.div {...mergedProps} />
}
