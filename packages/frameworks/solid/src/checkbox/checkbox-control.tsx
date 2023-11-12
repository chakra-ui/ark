import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

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
