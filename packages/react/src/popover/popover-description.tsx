import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverDescriptionProps = HTMLArkProps<'div'>

export const PopoverDescription = forwardRef<'div', PopoverDescriptionProps>((props, ref) => {
  const { descriptionProps } = usePopoverContext()
  const mergedProps = mergeProps(descriptionProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
