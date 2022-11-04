import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderTrackProps = HTMLAtlasProps<'div'>

export const SliderTrack = forwardRef<'div', SliderTrackProps>((props, ref) => {
  const { trackProps } = useSliderContext()
  return <atlas.div {...trackProps} {...props} ref={ref} />
})
