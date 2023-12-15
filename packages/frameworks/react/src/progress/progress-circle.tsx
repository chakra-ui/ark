import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleProps extends HTMLArkProps<'svg'> {}

export const ProgressCircle = forwardRef<SVGSVGElement, ProgressCircleProps>((props) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(api.circleProps, props)

  return <ark.svg {...mergedProps} />
})

ProgressCircle.displayName = 'ProgressCircle'
