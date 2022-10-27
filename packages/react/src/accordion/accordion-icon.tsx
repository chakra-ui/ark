import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'

export type AccordionIconProps = HTMLAtlasProps<'div'>

export const AccordionIcon = forwardRef<'div'>((props, ref) => {
  return <atlas.div {...props} ref={ref} />
})
