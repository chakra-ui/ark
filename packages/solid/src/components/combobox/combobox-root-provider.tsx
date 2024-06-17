import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import type { CollectionItem } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import type { UseComboboxReturn } from './use-combobox'
import { ComboboxProvider } from './use-combobox-context'

interface RootProviderProps<T extends CollectionItem> {
  value: UseComboboxReturn<T>
}
export interface ComboboxRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>,
    UsePresenceProps,
    PolymorphicProps<'div'> {}
export interface ComboboxRootProviderProps<T extends CollectionItem>
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ComboboxRootProviderBaseProps<T> {}

export const ComboboxRootProvider = <T extends CollectionItem>(
  props: ComboboxRootProviderProps<T>,
) => {
  const [presenceProps, comboboxProps] = splitPresenceProps(props)
  const [{ value: combobox }, localProps] = createSplitProps<RootProviderProps<T>>()(
    comboboxProps,
    ['value'],
  )

  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: combobox().open })))
  const mergedProps = mergeProps(() => combobox().getRootProps(), localProps)

  return (
    <ComboboxProvider value={combobox}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </ComboboxProvider>
  )
}
