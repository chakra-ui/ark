import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioLabelProps = HTMLArkProps<'span'>

export const RadioLabel = forwardRef<'span'>((props, ref) => {
  const { getRadioLabelProps } = useRadioGroupContext()
  const context = useRadioContext()
  const mergedProps = mergeProps(getRadioLabelProps(context), props)

  return <ark.span {...mergedProps} ref={ref} />
})
