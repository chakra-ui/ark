import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '~/factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxControlProps extends HTMLArkProps<'div'> {}

export const CheckboxControl = forwardRef<HTMLDivElement, CheckboxControlProps>((props, ref) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(checkbox.controlProps, props)

  return (
    <>
      <ark.div {...mergedProps} ref={ref} />
      <input {...checkbox.hiddenInputProps} />
    </>
  )
})

CheckboxControl.displayName = 'CheckboxControl'
