import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
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
      Assign<
        HTMLArkProps<'div'>,
        { children?: ReactNode | ((api: UseColorPickerReturn) => ReactNode) }
      >,
      UseColorPickerProps
    >,
    UsePresenceProps {}

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>((props, ref) => {
  const [presenceProps, colorPickerProps] = splitPresenceProps(props)
  const [useColorPickerProps, { children, ...localProps }] =
    createSplitProps<UseColorPickerProps>()(colorPickerProps, [
      'autoFocus',
      'defaultValue',
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
    ])
  const api = useColorPicker(useColorPickerProps)
  const presenceApi = usePresence({ ...presenceProps, present: api.isOpen })
  const view = runIfFn(children, api)
  const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <ColorPickerProvider value={api}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps} ref={ref}>
          {view}
        </ark.div>
        <input {...api.hiddenInputProps} />
      </PresenceProvider>
    </ColorPickerProvider>
  )
})

ColorPicker.displayName = 'ColorPicker'
