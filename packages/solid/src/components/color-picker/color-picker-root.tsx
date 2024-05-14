import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import { type UseColorPickerProps, useColorPicker } from './use-color-picker'
import { ColorPickerProvider } from './use-color-picker-context'

export interface ColorPickerRootProps
  extends Assign<HTMLArkProps<'div'>, UseColorPickerProps>,
    UsePresenceProps {}

export const ColorPickerRoot = (props: ColorPickerRootProps) => {
  const [presenceProps, colorPickerProps] = splitPresenceProps(props)
  const [useColorPickerProps, localProps] = createSplitProps<UseColorPickerProps>()(
    colorPickerProps,
    [
      'closeOnSelect',
      'defaultOpen',
      'defaultValue',
      'disabled',
      'format',
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
  const api = useColorPicker(useColorPickerProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().open })))
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <ColorPickerProvider value={api}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </ColorPickerProvider>
  )
}
