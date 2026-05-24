'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence/index.ts'
import type { UseColorPickerReturn } from './use-color-picker.ts'
import { ColorPickerProvider } from './use-color-picker-context.ts'

interface RootProviderProps {
  value: UseColorPickerReturn
}

export interface ColorPickerRootProviderBaseProps extends RootProviderProps, UsePresenceProps, PolymorphicProps {}
export interface ColorPickerRootProviderProps extends HTMLProps<'div'>, ColorPickerRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const ColorPickerRootProvider = forwardRef<HTMLDivElement, ColorPickerRootProviderProps>((props, ref) => {
  const [presenceProps, colorPickerProps] = splitPresenceProps(props)
  const [{ value: colorPicker }, localProps] = splitRootProviderProps(colorPickerProps, ['value'])
  const presence = usePresence(mergeProps({ present: colorPicker.open }, presenceProps))
  const mergedProps = mergeProps(colorPicker.getRootProps(), localProps)

  return (
    <ColorPickerProvider value={colorPicker}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </ColorPickerProvider>
  )
})

ColorPickerRootProvider.displayName = 'ColorPickerRootProvider'
