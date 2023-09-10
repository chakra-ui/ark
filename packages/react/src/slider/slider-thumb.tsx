import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderThumbProps = ComponentPropsWithoutRef<typeof ark.div>

export const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>((props, ref) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(api.thumbProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})

SliderThumb.displayName = 'SliderThumb'
