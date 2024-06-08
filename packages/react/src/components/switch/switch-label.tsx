import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchLabelProps extends HTMLArkProps<'span'> {}

export const SwitchLabel = forwardRef<HTMLSpanElement, SwitchLabelProps>((props, ref) => {
  const switchContext = useSwitchContext()
  const mergedProps = mergeProps(switchContext.getLabelProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

SwitchLabel.displayName = 'SwitchLabel'
