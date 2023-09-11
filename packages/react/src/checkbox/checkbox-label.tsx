import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxLabelProps = HtmlArkProps<'span'>

export const CheckboxLabel = forwardRef<HTMLSpanElement, CheckboxLabelProps>((props, ref) => {
  const { labelProps } = useCheckboxContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

CheckboxLabel.displayName = 'CheckboxLabel'
