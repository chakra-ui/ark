import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderThumbProps = ComponentPropsWithoutRef<typeof ark.div>

export const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>((props, ref) => {
  const { thumbProps, hiddenInputProps } = useSliderContext()
  const mergedProps = mergeProps(thumbProps, props)
  return (
    <>
      <ark.div {...mergedProps} ref={ref}>
        {props.children}
      </ark.div>
      <input {...hiddenInputProps} />
    </>
  )
})

SliderThumb.displayName = 'SliderThumb'
