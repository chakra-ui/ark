import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleBaseProps extends PolymorphicProps {}
export interface ProgressCircleProps extends HTMLProps<'svg'>, ProgressCircleBaseProps {}

export const ProgressCircle = forwardRef<SVGSVGElement, ProgressCircleProps>((props, ref) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getCircleProps(), props)

  return <ark.svg ref={ref} {...mergedProps} />
})

ProgressCircle.displayName = 'ProgressCircle'
