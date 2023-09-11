import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverTitleProps = HtmlArkProps<'div'>

export const PopoverTitle = forwardRef<HTMLDivElement, PopoverTitleProps>((props, ref) => {
  const { titleProps } = usePopoverContext()
  const mergedProps = mergeProps(titleProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverTitle.displayName = 'PopoverTitle'
