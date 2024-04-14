import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxControlProps extends HTMLArkProps<'div'> {}

export const CheckboxControl = (props: CheckboxControlProps) => {
  const api = useCheckboxContext()
  const mergedProps = mergeProps(() => api().controlProps, props)
  return (
    <>
      <ark.div {...mergedProps} />
      <input {...api().hiddenInputProps} />
    </>
  )
}
