import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export type SwitchThumbBaseProps = {}
export interface SwitchThumbProps extends HTMLArkProps<'span'>, SwitchThumbBaseProps {}

export const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>((props, ref) => {
  const switchContext = useSwitchContext()
  const mergedProps = mergeProps(switchContext.getThumbProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

SwitchThumb.displayName = 'SwitchThumb'
