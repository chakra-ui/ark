import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { ColorPickerProvider, type ColorPickerContext } from './color-picker-context'
import { useColorPicker, type UseColorPickerProps } from './use-color-picker'

export interface ColorPickerProps
  extends Assign<
    UseColorPickerProps,
    { children?: ReactNode | ((props: ColorPickerContext) => ReactNode) }
  > {}

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>((props, ref) => {
  const [colorPickerProps, { children, ...localProps }] = createSplitProps<UseColorPickerProps>()(
    props,
    [
      'alphaFormat',
      'autoFocus',
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
      'onInteractOutside',
      'onOpenChange',
      'onPointerDownOutside',
      'onValueChange',
      'onValueChange',
      'onValueChangeEnd',
      'open',
      'positioning',
      'readOnly',
      'value',
    ],
  )
  const api = useColorPicker(colorPickerProps)
  const view = runIfFn(children, api)
  const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <ColorPickerProvider value={api}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
      <input {...api.hiddenInputProps} />
    </ColorPickerProvider>
  )
})

ColorPicker.displayName = 'ColorPicker'
