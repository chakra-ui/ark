import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderLabelProps = HTMLAtlasProps<'label'>

export const SliderLabel = forwardRef<'label', SliderLabelProps>((props, ref) => {
  const { labelProps } = useSliderContext()
  return <atlas.label {...labelProps} {...props} ref={ref} />
})
