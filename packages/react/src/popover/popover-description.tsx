import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { usePopoverContext } from './popover-context'

export type PopoverDescriptionProps = HTMLArkProps<'div'>

export const PopoverDescription = forwardRef<'p'>((props, ref) => {
  const { descriptionProps } = usePopoverContext()
  const mergedProps = mergeProps(descriptionProps, props)

  return <ark.p {...mergedProps} ref={ref} />
})
