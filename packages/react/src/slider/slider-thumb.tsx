import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSliderContext } from './slider-context'

export type SliderThumbProps = HTMLArkProps<'div'>

export const SliderThumb = forwardRef<'div'>((props, ref) => {
  const { thumbProps, hiddenInputProps } = useSliderContext()
  const mergedProps = mergeProps(thumbProps, props)
  return (
    <ark.div {...mergedProps} ref={ref}>
      <ark.input {...hiddenInputProps} />
      {props.children}
    </ark.div>
  )
})
