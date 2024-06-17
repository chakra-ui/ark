import { mergeProps } from '@zag-js/react'
import { type LabelHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressLabelBaseProps extends PolymorphicProps {}
export interface ProgressLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    ProgressLabelBaseProps {}

export const ProgressLabel = forwardRef<HTMLLabelElement, ProgressLabelProps>((props, ref) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

ProgressLabel.displayName = 'ProgressLabel'
