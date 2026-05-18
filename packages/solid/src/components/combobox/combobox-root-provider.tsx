import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js/jsx-runtime'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence/index.tsx'
import type { UseComboboxReturn } from './use-combobox.ts'
import { ComboboxProvider } from './use-combobox-context.ts'
import type { CollectionItem } from '../collection/index.tsx'

interface RootProviderProps<T extends CollectionItem> {
  value: UseComboboxReturn<T>
}
export interface ComboboxRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>, UsePresenceProps, PolymorphicProps<'div'> {}
export interface ComboboxRootProviderProps<T extends CollectionItem>
  extends HTMLProps<'div'>, ComboboxRootProviderBaseProps<T> {}

export const ComboboxRootProvider = <T extends CollectionItem>(props: ComboboxRootProviderProps<T>) => {
  const [presenceProps, comboboxProps] = splitPresenceProps(props)
  const [{ value: combobox }, localProps] = createSplitProps<RootProviderProps<T>>()(comboboxProps, ['value'])

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

export type ComboboxRootProviderComponent<P = {}> = <T extends CollectionItem>(
  props: Assign<ComboboxRootProviderProps<T>, P>,
) => JSX.Element
