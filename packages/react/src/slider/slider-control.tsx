import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderControlProps = HTMLAtlasProps<'div'>

export const SliderControl = forwardRef<'div', SliderControlProps>((props, ref) => {
  const { controlProps } = useSliderContext()
  return <atlas.div {...controlProps} {...props} ref={ref} />
})
