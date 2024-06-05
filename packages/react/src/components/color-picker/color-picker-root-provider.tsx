import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import type { UseColorPickerReturn } from './use-color-picker'
import { ColorPickerProvider } from './use-color-picker-context'

interface RootProviderProps {
  value: UseColorPickerReturn
}

export interface ColorPickerRootProviderProps
  extends HTMLArkProps<'div'>,
    RootProviderProps,
    UsePresenceProps {}

export const ColorPickerRootProvider = forwardRef<HTMLDivElement, ColorPickerRootProviderProps>(
  (props, ref) => {
    const [presenceProps, colorPickerProps] = splitPresenceProps(props)
    const [{ value: colorPicker }, localProps] = createSplitProps<RootProviderProps>()(
      colorPickerProps,
      ['value'],
    )
    const presence = usePresence(mergeProps({ present: colorPicker.open }, presenceProps))
    const mergedProps = mergeProps(colorPicker.rootProps, localProps)

    return (
      <ColorPickerProvider value={colorPicker}>
        <PresenceProvider value={presence}>
          <ark.div {...mergedProps} ref={ref} />
        </PresenceProvider>
      </ColorPickerProvider>
    )
  },
)

ColorPickerRootProvider.displayName = 'ColorPickerRootProvider'
