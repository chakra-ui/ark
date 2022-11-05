import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverTitleProps = HTMLAtlasProps<'div'>

export const PopoverTitle = forwardRef<'div', PopoverTitleProps>((props, ref) => {
  const { titleProps } = usePopoverContext()
  const mergedProps = mergeProps(titleProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
