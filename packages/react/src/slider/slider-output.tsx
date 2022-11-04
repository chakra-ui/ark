import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderOutputProps = HTMLAtlasProps<'output'>

export const SliderOutput = forwardRef<'output', SliderOutputProps>((props, ref) => {
  const { outputProps } = useSliderContext()
  return <atlas.output {...outputProps} {...props} ref={ref} />
})
