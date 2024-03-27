import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxIndicatorProps extends HTMLArkProps<'div'> {}

export const CheckboxIndicator = (props: CheckboxIndicatorProps) => {
  const api = useCheckboxContext()
  const mergedProps = mergeProps(() => api().indicatorProps, props)

  return <ark.div {...mergedProps} />
}
