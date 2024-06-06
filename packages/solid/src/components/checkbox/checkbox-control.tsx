import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxControlProps extends HTMLArkProps<'div'> {}

export const CheckboxControl = (props: CheckboxControlProps) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(() => checkbox().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
