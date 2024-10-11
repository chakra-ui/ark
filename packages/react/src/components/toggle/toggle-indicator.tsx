import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { HTMLArkProps } from '../factory'
import { ark } from '../factory'
import { useToggleContext } from './use-toggle-context'

export interface ToggleIndicatorBaseProps {
  /**
   * The fallback content to render when the toggle is not pressed.
   */
  fallback?: React.ReactNode
}

export interface ToggleIndicatorProps extends HTMLArkProps<'div'>, ToggleIndicatorBaseProps {}

export const ToggleIndicator = forwardRef<HTMLDivElement, ToggleIndicatorProps>((props, ref) => {
  const { children, fallback, ...restProps } = props
  const toggle = useToggleContext()
  const mergedProps = mergeProps(toggle.getIndicatorProps(), restProps)
  return (
    <ark.div {...mergedProps} ref={ref}>
      {toggle.pressed ? children : fallback}
    </ark.div>
  )
})

ToggleIndicator.displayName = 'ToggleIndicator'
