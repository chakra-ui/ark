import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence/index.tsx'
import { type UseColorPickerProps, useColorPicker } from './use-color-picker.ts'
import { ColorPickerProvider } from './use-color-picker-context.ts'

export interface ColorPickerRootBaseProps extends UseColorPickerProps, UsePresenceProps, PolymorphicProps<'div'> {}
export interface ColorPickerRootProps extends HTMLProps<'div'>, ColorPickerRootBaseProps {}

export const ColorPickerRoot = (props: ColorPickerRootProps) => {
  const [presenceProps, colorPickerProps] = splitPresenceProps(props)
  const [useColorPickerProps, localProps] = createSplitProps<UseColorPickerProps>()(colorPickerProps, [
    'closeOnSelect',
    'defaultOpen',
    'defaultValue',
    'defaultFormat',
    'disabled',
    'format',
    'id',
    'ids',
    'initialFocusEl',
    'invalid',
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
    'openAutoFocus',
    'positioning',
    'readOnly',
    'required',
    'inline',
    'value',
  ])
  const api = useColorPicker(useColorPickerProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().open })))
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <ColorPickerProvider value={api}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </ColorPickerProvider>
  )
}
