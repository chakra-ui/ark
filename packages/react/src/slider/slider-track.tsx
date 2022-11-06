import { forwardRef } from '@polymorphic-factory/react'
import { ark, HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderTrackProps = HTMLArkProps<'div'>

export const SliderTrack = forwardRef<'div', SliderTrackProps>((props, ref) => {
  const { trackProps } = useSliderContext()
  return <ark.div {...trackProps} {...props} ref={ref} />
})
