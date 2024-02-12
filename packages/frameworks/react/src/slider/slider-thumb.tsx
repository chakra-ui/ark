import { mergeProps } from '@zag-js/react'
import type { ThumbProps } from '@zag-js/slider'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useSliderContext } from './slider-context'

export interface SliderThumbProps extends Assign<HTMLArkProps<'div'>, ThumbProps> {}

export const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>((props, ref) => {
  const [thumbProps, localProps] = createSplitProps<ThumbProps>()(props, ['index'])
  const api = useSliderContext()
  const mergedProps = mergeProps(api.getThumbProps(thumbProps), localProps)

  return (
    <>
      <ark.div {...mergedProps} ref={ref} />
      <input {...api.getHiddenInputProps(thumbProps)} />
    </>
  )
})

SliderThumb.displayName = 'SliderThumb'
