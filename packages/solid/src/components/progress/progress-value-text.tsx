import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressValueTextBaseProps extends PolymorphicProps<'span'> {}
export interface ProgressValueTextProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    ProgressValueTextBaseProps {}

export const ProgressValueText = (props: ProgressValueTextProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getValueTextProps(), props)

  return <ark.span {...mergedProps}>{props.children || api().valueAsString}</ark.span>
}
