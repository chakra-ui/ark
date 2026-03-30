import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputLabelBaseProps extends PolymorphicProps<'label'> {}
export interface DateInputLabelProps extends HTMLProps<'label'>, DateInputLabelBaseProps {}

export const DateInputLabel = (props: DateInputLabelProps) => {
  const api = useDateInputContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)
  return <ark.label {...mergedProps} />
}
