import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioLabelProps = HTMLArkProps<'span'>

export const RadioLabel = forwardRef<'span', RadioLabelProps>((props, ref) => {
  const { getItemLabelProps } = useRadioGroupContext()
  const context = useRadioContext()
  const mergedProps = mergeProps(getItemLabelProps(context), props)

  return <ark.span {...mergedProps} ref={ref} />
})
