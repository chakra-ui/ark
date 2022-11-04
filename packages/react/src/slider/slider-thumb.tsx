import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderThumbProps = HTMLAtlasProps<'div'>

export const SliderThumb = forwardRef<'div', SliderThumbProps>((props, ref) => {
  const { thumbProps } = useSliderContext()
  return <atlas.div {...thumbProps} {...props} ref={ref} />
})
