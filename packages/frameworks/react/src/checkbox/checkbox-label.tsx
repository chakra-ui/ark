import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export interface CheckboxLabelProps extends HTMLArkProps<'span'> {}

export const CheckboxLabel = forwardRef<HTMLSpanElement, CheckboxLabelProps>((props, ref) => {
  const api = useCheckboxContext()
  const mergedProps = mergeProps(api.labelProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

CheckboxLabel.displayName = 'CheckboxLabel'
