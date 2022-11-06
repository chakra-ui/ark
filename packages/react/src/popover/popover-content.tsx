import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverContentProps = HTMLArkProps<'div'>

export const PopoverContent = forwardRef<'div', PopoverContentProps>((props, ref) => {
  const { contentProps } = usePopoverContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
