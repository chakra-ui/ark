import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverDescriptionProps = HTMLAtlasProps<'div'>

export const PopoverDescription = forwardRef<'div', PopoverDescriptionProps>((props, ref) => {
  const { descriptionProps } = usePopoverContext()
  const mergedProps = mergeProps(descriptionProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
