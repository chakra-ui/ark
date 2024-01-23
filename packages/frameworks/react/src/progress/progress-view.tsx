import type { ViewProps } from '@zag-js/progress'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useProgressContext } from './progress-context'

export interface ProgressViewProps extends Assign<HTMLArkProps<'span'>, ViewProps> {}

export const ProgressView = forwardRef<HTMLSpanElement, ProgressViewProps>((props, ref) => {
  const { state, ...rest } = props
  const api = useProgressContext()
  const mergedProps = mergeProps(api.getViewProps({ state }), rest)

  return <ark.span {...mergedProps} ref={ref} />
})

ProgressView.displayName = 'ProgressView'
