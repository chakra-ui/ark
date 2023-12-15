import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressLabelProps extends HTMLArkProps<'label'> {}

export const ProgressLabel = forwardRef<HTMLLabelElement, ProgressLabelProps>((props, ref) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(api.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

ProgressLabel.displayName = 'ProgressLabel'
