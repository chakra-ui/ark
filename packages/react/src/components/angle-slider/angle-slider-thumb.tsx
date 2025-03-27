import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderThumbBaseProps extends PolymorphicProps {}
export interface AngleSliderThumbProps extends HTMLProps<'span'>, AngleSliderThumbBaseProps {}

export const AngleSliderThumb = forwardRef<HTMLDivElement, AngleSliderThumbProps>((props, ref) => {
  const angleSlider = useAngleSliderContext()
  const mergedProps = mergeProps(angleSlider.getThumbProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

AngleSliderThumb.displayName = 'AngleSliderThumb'
