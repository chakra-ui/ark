import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { parts } from './carousel.anatomy'

export type CarouselControlProps = HTMLArkProps<'div'>

export const CarouselControl = forwardRef<'div'>((props, ref) => (
  <ark.div {...parts.control.attrs} {...props} ref={ref} />
))
