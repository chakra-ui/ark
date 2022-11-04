import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderRangeProps = HTMLAtlasProps<'div'>

export const SliderRange = forwardRef<'div', SliderRangeProps>((props, ref) => {
  const { rangeProps } = useSliderContext()
  return <atlas.div {...rangeProps} {...props} ref={ref} />
})
