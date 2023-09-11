import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioLabelProps = HtmlArkProps<'span'>

export const RadioLabel = forwardRef<HTMLSpanElement, RadioLabelProps>((props, ref) => {
  const { getRadioLabelProps } = useRadioGroupContext()
  const context = useRadioContext()
  const mergedProps = mergeProps(getRadioLabelProps(context), props)

  return <ark.span {...mergedProps} ref={ref} />
})

RadioLabel.displayName = 'RadioLabel'
