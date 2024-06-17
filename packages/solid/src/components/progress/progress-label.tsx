import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressLabelBaseProps extends PolymorphicProps<'label'> {}
export interface ProgressLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    ProgressLabelBaseProps {}

export const ProgressLabel = (props: ProgressLabelProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
