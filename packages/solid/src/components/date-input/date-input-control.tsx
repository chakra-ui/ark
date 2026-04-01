import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputControlBaseProps extends PolymorphicProps<'div'> {}
export interface DateInputControlProps extends HTMLProps<'div'>, DateInputControlBaseProps {}

export const DateInputControl = (props: DateInputControlProps) => {
  const api = useDateInputContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)
  return <ark.div {...mergedProps} />
}
