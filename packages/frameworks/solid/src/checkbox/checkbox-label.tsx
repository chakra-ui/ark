import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export interface CheckboxLabelProps extends HTMLArkProps<'span'> {}

export const CheckboxLabel: ArkComponent<'span'> = (props: CheckboxLabelProps) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(() => checkbox().labelProps, props)

  return <ark.span {...mergedProps} />
}
