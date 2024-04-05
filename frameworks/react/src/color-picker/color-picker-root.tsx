import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { type Assign } from '../types'
import { useColorPicker, type UseColorPickerProps } from './use-color-picker'
import { ColorPickerProvider } from './use-color-picker-context'

export interface ColorPickerRootProps
  extends Assign<HTMLArkProps<'div'>, UseColorPickerProps>,
    UsePresenceProps {}

export const ColorPickerRoot = forwardRef<HTMLDivElement, ColorPickerRootProps>((props, ref) => {
  const [presenceProps, colorPickerProps] = splitPresenceProps(props)
  const [useColorPickerProps, localProps] = createSplitProps<UseColorPickerProps>()(
    colorPickerProps,
    [
      'closeOnSelect',
      'defaultValue',
      'dir',
      'disabled',
      'format',
      'getRootNode',
      'id',
      'ids',
      'initialFocusEl',
      'name',
      'name',
      'onFocusOutside',
      'onFormatChange',
      'onInteractOutside',
      'onOpenChange',
      'onPointerDownOutside',
      'onValueChange',
      'onValueChangeEnd',
      'open',
      'positioning',
      'readOnly',
      'value',
    ],
  )
  const colorPicker = useColorPicker(useColorPickerProps)
  const presence = usePresence(mergeProps({ present: colorPicker.isOpen }, presenceProps))
  const mergedProps = mergeProps(colorPicker.rootProps, localProps)

  return (
    <ColorPickerProvider value={colorPicker}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
        <input {...colorPicker.hiddenInputProps} />
      </PresenceProvider>
    </ColorPickerProvider>
  )
})

ColorPickerRoot.displayName = 'ColorPickerRoot'
