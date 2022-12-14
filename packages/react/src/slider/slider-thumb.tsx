import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderThumbProps = HTMLArkProps<'div'>

export const SliderThumb = forwardRef<'div', SliderThumbProps>((props, ref) => {
  const { thumbProps, hiddenInputProps } = useSliderContext()
  const mergedProps = mergeProps(thumbProps, props)

  return (
    <ark.div {...mergedProps} ref={ref}>
      <ark.input {...hiddenInputProps} />
      {props.children}
    </ark.div>
  )
})
