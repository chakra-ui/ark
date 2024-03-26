import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchLabelProps extends HTMLArkProps<'span'> {}

export const SwitchLabel = forwardRef<HTMLSpanElement, SwitchLabelProps>((props, ref) => {
  const context = useSwitchContext()
  const mergedProps = mergeProps(context.labelProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

SwitchLabel.displayName = 'SwitchLabel'
