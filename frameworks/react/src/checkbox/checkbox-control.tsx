import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxControlProps extends HTMLArkProps<'div'> {}

export const CheckboxControl = forwardRef<HTMLDivElement, CheckboxControlProps>((props, ref) => {
  const context = useCheckboxContext()
  const mergedProps = mergeProps(context.controlProps, props)

  return (
    <>
      <ark.div {...mergedProps} ref={ref} />
      <input {...context.hiddenInputProps} />
    </>
  )
})

CheckboxControl.displayName = 'CheckboxControl'
