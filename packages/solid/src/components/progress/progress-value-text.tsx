import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useProgressContext } from './use-progress-context.ts'

export interface ProgressValueTextBaseProps extends PolymorphicProps<'span'> {}
export interface ProgressValueTextProps extends HTMLProps<'span'>, ProgressValueTextBaseProps {}

export const ProgressValueText = (props: ProgressValueTextProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getValueTextProps(), props)

  return <ark.span {...mergedProps}>{props.children || api().percentAsString}</ark.span>
}
