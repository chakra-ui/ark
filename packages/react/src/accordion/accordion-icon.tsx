import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'

export type AccordionIconProps = HTMLArkProps<'div'> & { foo: string }

export const AccordionIcon = forwardRef<'div', AccordionIconProps>((props, ref) => {
  return <ark.div {...props} ref={ref} />
})
