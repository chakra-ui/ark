'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchControlBaseProps extends PolymorphicProps {}
export interface SwitchControlProps extends HTMLProps<'span'>, SwitchControlBaseProps {}

export const SwitchControl = ({ ref, ...props }: SwitchControlProps) => {
  const switchContext = useSwitchContext()
  const mergedProps = mergeProps(switchContext.getControlProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
}

SwitchControl.displayName = 'SwitchControl'
