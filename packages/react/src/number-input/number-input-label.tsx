import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useNumberInputContext } from './number-input-context'

export type NumberInputLabelProps = HTMLArkProps<'label'>

export const NumberInputLabel = forwardRef<'label'>((props, ref) => {
  const { labelProps } = useNumberInputContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})
