import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioLabelProps = ComponentPropsWithoutRef<typeof ark.span>

export const RadioLabel = forwardRef<HTMLSpanElement, RadioLabelProps>((props, ref) => {
  const { getRadioLabelProps } = useRadioGroupContext()
  const context = useRadioContext()
  const mergedProps = mergeProps(getRadioLabelProps(context), props)

  return <ark.span {...mergedProps} ref={ref} />
})

RadioLabel.displayName = 'RadioLabel'
