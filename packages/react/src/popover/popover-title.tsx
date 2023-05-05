import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { usePopoverContext } from './popover-context'

export type PopoverTitleProps = HTMLArkProps<'div'>

export const PopoverTitle = forwardRef<'div'>((props, ref) => {
  const { titleProps } = usePopoverContext()
  const mergedProps = mergeProps(titleProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
