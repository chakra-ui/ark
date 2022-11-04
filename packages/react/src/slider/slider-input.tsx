import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderInputProps = HTMLAtlasProps<'input'>

export const SliderInput = forwardRef<'input', SliderInputProps>((props, ref) => {
  const { inputProps } = useSliderContext()
  return <atlas.input {...inputProps} {...props} ref={ref} />
})
