import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { AreaProps } from '@zag-js/color-picker'

export interface UseColorPickerAreaPropsContext extends Accessor<AreaProps> {}

export const [ColorPickerAreaPropsProvider, useColorPickerAreaPropsContext] =
  createContext<UseColorPickerAreaPropsContext>({
    name: 'ColorPickerAreaContext',
    hookName: 'useColorPickerAreaContext',
    providerName: '<ColorPickerAreaProvider />',
  })
