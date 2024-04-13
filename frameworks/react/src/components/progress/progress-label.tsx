import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '~/factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressLabelProps extends HTMLArkProps<'label'> {}

export const ProgressLabel = forwardRef<HTMLLabelElement, ProgressLabelProps>((props, ref) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

ProgressLabel.displayName = 'ProgressLabel'
