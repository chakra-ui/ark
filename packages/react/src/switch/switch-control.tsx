import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSwitchContext } from './switch-context'

export type SwitchControlProps = ComponentPropsWithoutRef<typeof ark.span>

export const SwitchControl = forwardRef<HTMLSpanElement, SwitchControlProps>((props, ref) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(api.controlProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

SwitchControl.displayName = 'SwitchControl'
