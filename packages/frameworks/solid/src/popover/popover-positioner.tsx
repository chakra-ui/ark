import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverPositionerProps = HTMLArkProps<'div'>

export const PopoverPositioner = (props: PopoverPositionerProps) => {
  const api = usePopoverContext()
  const positionerProps = mergeProps(() => api().positionerProps, props)
  return <ark.div {...positionerProps} />
}
