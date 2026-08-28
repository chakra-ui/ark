import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence/index.tsx'
import type { UseColorPickerReturn } from './use-color-picker.ts'
import { ColorPickerProvider } from './use-color-picker-context.ts'

interface RootProviderProps {
  value: UseColorPickerReturn
}

export interface ColorPickerRootProviderBaseProps
  extends RootProviderProps, UsePresenceProps, PolymorphicProps<'div'> {}
export interface ColorPickerRootProviderProps extends HTMLProps<'div'>, ColorPickerRootProviderBaseProps {}

export const ColorPickerRootProvider = (props: ColorPickerRootProviderProps) => {
  const [presenceProps, colorPickerProps] = splitPresenceProps(props)
  const [{ value: colorPicker }, localProps] = createSplitProps<RootProviderProps>()(colorPickerProps, ['value'])
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: colorPicker().open })))
  const mergedProps = mergeProps(() => colorPicker().getRootProps(), localProps)

  return (
    <ColorPickerProvider value={colorPicker}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </ColorPickerProvider>
  )
}
