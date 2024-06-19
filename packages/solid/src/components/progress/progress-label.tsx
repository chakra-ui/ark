import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressLabelBaseProps extends PolymorphicProps<'label'> {}
export interface ProgressLabelProps extends HTMLProps<'label'>, ProgressLabelBaseProps {}

export const ProgressLabel = (props: ProgressLabelProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
