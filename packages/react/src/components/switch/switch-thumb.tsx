'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchThumbBaseProps extends PolymorphicProps {}
export interface SwitchThumbProps extends HTMLProps<'span'>, SwitchThumbBaseProps {}

export const SwitchThumb = ({ ref, ...props }: SwitchThumbProps) => {
  const switchContext = useSwitchContext()
  const mergedProps = mergeProps(switchContext.getThumbProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
}

SwitchThumb.displayName = 'SwitchThumb'
