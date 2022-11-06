import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverTitleProps = HTMLArkProps<'div'>

export const PopoverTitle = forwardRef<'div', PopoverTitleProps>((props, ref) => {
  const { titleProps } = usePopoverContext()
  const mergedProps = mergeProps(titleProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
