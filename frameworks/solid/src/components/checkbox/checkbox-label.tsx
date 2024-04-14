import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxLabelProps extends HTMLArkProps<'span'> {}

export const CheckboxLabel = (props: CheckboxLabelProps) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(() => checkbox().labelProps, props)

  return <ark.span {...mergedProps} />
}
