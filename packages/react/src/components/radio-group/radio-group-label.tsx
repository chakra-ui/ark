'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupLabelBaseProps extends PolymorphicProps {}
export interface RadioGroupLabelProps extends HTMLProps<'span'>, RadioGroupLabelBaseProps {}

export const RadioGroupLabel = forwardRef<HTMLSpanElement, RadioGroupLabelProps>((props, ref) => {
  const radioGroup = useRadioGroupContext()
  const mergedProps = mergeProps(radioGroup.getLabelProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

RadioGroupLabel.displayName = 'RadioGroupLabel'
