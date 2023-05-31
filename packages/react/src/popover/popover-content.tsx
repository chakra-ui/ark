import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { usePopoverContext } from './popover-context'

export type PopoverContentProps = HTMLArkProps<'div'>

export const PopoverContent = forwardRef<'div'>((props, ref) => {
  const { contentProps } = usePopoverContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
