'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerContentBaseProps extends PolymorphicProps {}
export interface ColorPickerContentProps extends HTMLProps<'div'>, ColorPickerContentBaseProps {}

export const ColorPickerContent = forwardRef<HTMLDivElement, ColorPickerContentProps>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(colorPicker.getContentProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={composedRefs} />
})

ColorPickerContent.displayName = 'ColorPickerContent'
