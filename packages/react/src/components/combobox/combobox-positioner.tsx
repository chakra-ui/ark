'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useComboboxContext } from './use-combobox-context.ts'

export interface ComboboxPositionerBaseProps extends PolymorphicProps {}
export interface ComboboxPositionerProps extends HTMLProps<'div'>, ComboboxPositionerBaseProps {}

export const ComboboxPositioner = forwardRef<HTMLDivElement, ComboboxPositionerProps>((props, ref) => {
  const combobox = useComboboxContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(combobox.getPositionerProps(), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
})

ComboboxPositioner.displayName = 'ComboboxPositioner'
