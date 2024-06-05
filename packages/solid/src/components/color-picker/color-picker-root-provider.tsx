import { mergeProps } from '@zag-js/solid'
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

export const ColorPickerRootProvider = (props: ColorPickerRootProviderProps) => {
  const [presenceProps, colorPickerProps] = splitPresenceProps(props)
  const [{ value: colorPicker }, localProps] = createSplitProps<RootProviderProps>()(
    colorPickerProps,
    ['value'],
  )
  const apiPresence = usePresence(
    mergeProps(presenceProps, () => ({ present: colorPicker().open })),
  )
  const mergedProps = mergeProps(() => colorPicker().rootProps, localProps)

  return (
    <ColorPickerProvider value={colorPicker}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </ColorPickerProvider>
  )
}
