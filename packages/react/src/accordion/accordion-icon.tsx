import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'

export type AccordionIconProps = HTMLAtlasProps<'div'>

export const AccordionIcon = forwardRef<'div', AccordionIconProps>((props, ref) => {
  return <atlas.div {...props} ref={ref} />
})
