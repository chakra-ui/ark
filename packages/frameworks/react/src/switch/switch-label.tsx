import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export interface SwitchLabelProps extends HTMLArkProps<'span'> {}

export const SwitchLabel = forwardRef<HTMLSpanElement, SwitchLabelProps>((props, ref) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(api.labelProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

SwitchLabel.displayName = 'SwitchLabel'
