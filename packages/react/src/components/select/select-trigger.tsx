'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectTriggerBaseProps extends PolymorphicProps {}
export interface SelectTriggerProps extends HTMLProps<'button'>, SelectTriggerBaseProps {}

export const SelectTrigger = ({ ref, ...props }: SelectTriggerProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

SelectTrigger.displayName = 'SelectTrigger'
