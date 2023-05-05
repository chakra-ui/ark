import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxLabelProps = HTMLArkProps<'span'>

export const CheckboxLabel = forwardRef<'span'>((props, ref) => {
  const { labelProps } = useCheckboxContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})
