import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export type SwitchControlProps = HtmlArkProps<'span'>

export const SwitchControl = forwardRef<HTMLSpanElement, SwitchControlProps>((props, ref) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(api.controlProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

SwitchControl.displayName = 'SwitchControl'
