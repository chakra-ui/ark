import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderThumbProps = ComponentPropsWithoutRef<typeof ark.div>

export const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>((props, ref) => {
  const { thumbProps } = useSliderContext()
  const mergedProps = mergeProps(thumbProps, props)
  return (
    <ark.div {...mergedProps} ref={ref}>
      <SliderHiddenInput />
      {props.children}
    </ark.div>
  )
})

SliderThumb.displayName = 'SliderThumb'

const SliderHiddenInput = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<typeof ark.input>>(
  (props, ref) => {
    const { hiddenInputProps } = useSliderContext()
    const mergedProps = mergeProps(hiddenInputProps, props)
    return <ark.input {...mergedProps} ref={ref} />
  },
)

SliderHiddenInput.displayName = 'SliderHiddenInput'
