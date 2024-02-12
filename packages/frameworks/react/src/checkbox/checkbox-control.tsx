import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export interface CheckboxControlProps extends HTMLArkProps<'div'> {}

export const CheckboxControl = forwardRef<HTMLDivElement, CheckboxControlProps>((props, ref) => {
  const api = useCheckboxContext()
  const mergedProps = mergeProps(api.controlProps, props)

  return (
    <>
      <ark.div {...mergedProps} ref={ref} />
      <input {...api.hiddenInputProps} />
    </>
  )
})

CheckboxControl.displayName = 'CheckboxControl'
