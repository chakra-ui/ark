import { mergeProps } from '@zag-js/react'
import type { ThumbProps } from '@zag-js/slider'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'
import { SliderThumbPropsProvider } from './use-slider-thumb-props-context'

export interface SliderThumbBaseProps extends ThumbProps, PolymorphicProps {}
export interface SliderThumbProps extends HTMLProps<'div'>, SliderThumbBaseProps {}

export const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>((props, ref) => {
  const [thumbProps, localProps] = createSplitProps<ThumbProps>()(props, ['index', 'name'])
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getThumbProps(thumbProps), localProps)

  return (
    <SliderThumbPropsProvider value={thumbProps}>
      <ark.div {...mergedProps} ref={ref} />
    </SliderThumbPropsProvider>
  )
})

SliderThumb.displayName = 'SliderThumb'
