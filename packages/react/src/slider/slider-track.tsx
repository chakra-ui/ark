import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderTrackProps = HTMLArkProps<'div'>

export const SliderTrack = forwardRef<'div', SliderTrackProps>((props, ref) => {
  const { trackProps } = useSliderContext()
  const mergedProps = mergeProps(trackProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
