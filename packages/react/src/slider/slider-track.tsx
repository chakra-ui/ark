import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSliderContext } from './slider-context'

export type SliderTrackProps = HTMLArkProps<'div'>

export const SliderTrack = forwardRef<'div'>((props, ref) => {
  const { trackProps } = useSliderContext()
  const mergedProps = mergeProps(trackProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})
