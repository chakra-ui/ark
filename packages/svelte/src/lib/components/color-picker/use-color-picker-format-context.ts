import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ColorFormat } from '@zag-js/color-picker'

export interface UseColorPickerFormatPropsContext extends Accessor<{ format?: ColorFormat }> {}

const EMPTY_OBJ = {}

export const [ColorPickerFormatPropsProvider, useColorPickerFormatPropsContext] =
  createContext<UseColorPickerFormatPropsContext>({
    name: 'ColorPickerFormatContext',
    hookName: 'useColorPickerFormatPropsContext',
    providerName: '<ColorPickerFormatPropsProvider />',
    strict: false,
    defaultValue: () => EMPTY_OBJ,
  })
