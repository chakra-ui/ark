import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { usePopoverContext } from './popover-context'

export type PopoverDescriptionProps = HTMLArkProps<'div'>

export const PopoverDescription = forwardRef<'div', PopoverDescriptionProps>((props, ref) => {
  const { descriptionProps } = usePopoverContext()
  const mergedProps = mergeProps(descriptionProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
