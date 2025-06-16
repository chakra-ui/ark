import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { SwatchProps } from '@zag-js/color-picker'

export interface UseColorPickerSwatchPropsContext extends Accessor<SwatchProps> {}

export const [ColorPickerSwatchPropsProvider, useColorPickerSwatchPropsContext] =
  createContext<UseColorPickerSwatchPropsContext>({
    name: 'ColorPickerSwatchPropsContext',
    hookName: 'useColorPickerSwatchPropsContext',
    providerName: '<ColorPickerSwatchPropsProvider />',
    strict: false,
  })
