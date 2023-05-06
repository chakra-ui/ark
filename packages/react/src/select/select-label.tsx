import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSelectContext } from './select-context'

export type SelectLabelProps = HTMLArkProps<'label'>

export const SelectLabel = forwardRef<'label', SelectLabelProps>((props, ref) => {
  const { labelProps } = useSelectContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})
