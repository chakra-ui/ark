import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
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

export interface ColorPickerRootProviderBaseProps
  extends RootProviderProps,
    UsePresenceProps,
    PolymorphicProps<'div'> {}
export interface ColorPickerRootProviderProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ColorPickerRootProviderBaseProps {}

export const ColorPickerRootProvider = (props: ColorPickerRootProviderProps) => {
  const [presenceProps, colorPickerProps] = splitPresenceProps(props)
  const [{ value: colorPicker }, localProps] = createSplitProps<RootProviderProps>()(
    colorPickerProps,
    ['value'],
  )
  const apiPresence = usePresence(
    mergeProps(presenceProps, () => ({ present: colorPicker().open })),
  )
  const mergedProps = mergeProps(() => colorPicker().getRootProps(), localProps)

  return (
    <ColorPickerProvider value={colorPicker}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </ColorPickerProvider>
  )
}
