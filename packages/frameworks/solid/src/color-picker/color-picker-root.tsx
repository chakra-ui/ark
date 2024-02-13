import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
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

interface ElementProps extends UseColorPickerProps, UsePresenceProps {
  children?: JSX.Element | ((api: UseColorPickerReturn) => JSX.Element)
}

export interface ColorPickerRootProps extends Assign<HTMLArkProps<'div'>, ElementProps> {}

export const ColorPickerRoot: ArkComponent<'div', ElementProps> = (props: ColorPickerRootProps) => {
  const [presenceProps, colorPickerProps] = splitPresenceProps(props)
  const [useColorPickerProps, localProps] = createSplitProps<UseColorPickerProps>()(
    colorPickerProps,
    [
      'closeOnSelect',
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
      'open.controlled',
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
