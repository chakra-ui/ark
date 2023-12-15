import type { IndicatorProps } from '@zag-js/progress'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useProgressContext } from './progress-context'

export interface ProgressIndicatorProps extends Assign<HTMLArkProps<'span'>, IndicatorProps> {}

export const ProgressIndicator = forwardRef<HTMLSpanElement, ProgressIndicatorProps>(
  (props, ref) => {
    const { state, ...rest } = props
    const api = useProgressContext()
    const mergedProps = mergeProps(api.getIndicatorProps({ state }), rest)

    return <ark.span {...mergedProps} ref={ref} />
  },
)

ProgressIndicator.displayName = 'ProgressIndicator'
