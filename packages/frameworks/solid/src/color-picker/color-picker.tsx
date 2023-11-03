import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { ColorPickerProvider } from './color-picker-context'
import {
  useColorPicker,
  type UseColorPickerProps,
  type UseColorPickerReturn,
} from './use-color-picker'

export interface ColorPickerProps
  extends Assign<
      HTMLArkProps<'div'>,
      UseColorPickerProps & {
        children?: JSX.Element | ((state: UseColorPickerReturn) => JSX.Element)
      }
    >,
    UsePresenceProps {}

export const ColorPicker = (props: ColorPickerProps) => {
  const [presenceProps, colorPickerProps] = splitPresenceProps(props)
  const [useColorPickerProps, localProps] = createSplitProps<UseColorPickerProps>()(
    colorPickerProps,
    [
      'autoFocus',
      'dir',
      'disabled',
      'getRootNode',
      'id',
      'ids',
      'initialFocusEl',
      'name',
      'name',
      'onFocusOutside',
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
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().isOpen })))
  const mergedProps = mergeProps(() => api().rootProps, localProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <ColorPickerProvider value={api}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps}>{getChildren()}</ark.div>
      </PresenceProvider>
      <input {...api().hiddenInputProps} />
    </ColorPickerProvider>
  )
}
