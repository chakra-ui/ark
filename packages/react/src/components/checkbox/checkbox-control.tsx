'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useCheckboxContext } from './use-checkbox-context.ts'

export interface CheckboxControlBaseProps extends PolymorphicProps {}
export interface CheckboxControlProps extends HTMLProps<'span'>, CheckboxControlBaseProps {}

export const CheckboxControl = forwardRef<HTMLSpanElement, CheckboxControlProps>((props, ref) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(checkbox.getControlProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

CheckboxControl.displayName = 'CheckboxControl'
