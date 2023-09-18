import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverDescriptionProps = HTMLArkProps<'div'>

export const PopoverDescription = (props: PopoverDescriptionProps) => {
  const api = usePopoverContext()
  const descriptionProps = mergeProps(() => api().descriptionProps, props)
  return <ark.div {...descriptionProps} />
}
