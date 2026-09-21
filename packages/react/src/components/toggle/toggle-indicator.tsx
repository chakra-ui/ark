'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { HTMLArkProps } from '../factory.ts'
import { ark } from '../factory.ts'
import { useToggleContext } from './use-toggle-context.ts'

export interface ToggleIndicatorBaseProps {
  /**
   * The fallback content to render when the toggle is not pressed.
   */
  fallback?: React.ReactNode | undefined
}

export interface ToggleIndicatorProps extends HTMLArkProps<'span'>, ToggleIndicatorBaseProps {}

export const ToggleIndicator = forwardRef<HTMLSpanElement, ToggleIndicatorProps>((props, ref) => {
  const { children, fallback, ...restProps } = props
  const toggle = useToggleContext()
  const mergedProps = mergeProps(toggle.getIndicatorProps(), restProps)
  return (
    <ark.span {...mergedProps} ref={ref}>
      {toggle.pressed ? children : fallback}
    </ark.span>
  )
})

ToggleIndicator.displayName = 'ToggleIndicator'
