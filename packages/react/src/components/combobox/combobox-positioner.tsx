'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxPositionerBaseProps extends PolymorphicProps {}
export interface ComboboxPositionerProps extends HTMLProps<'div'>, ComboboxPositionerBaseProps {}

export const ComboboxPositioner = ({ ref, ...props }: ComboboxPositionerProps) => {
  const combobox = useComboboxContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(combobox.getPositionerProps(), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
}

ComboboxPositioner.displayName = 'ComboboxPositioner'
