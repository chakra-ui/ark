import { forwardRef } from '@polymorphic-factory/react'
import { ark, type HTMLArkProps } from '../factory'

export type AccordionIconProps = HTMLArkProps<'div'>

export const AccordionIcon = forwardRef<'div', AccordionIconProps>((props, ref) => {
  return <ark.div {...props} ref={ref} />
})
