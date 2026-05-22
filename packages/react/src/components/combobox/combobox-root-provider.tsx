'use client'

import { mergeProps } from '@zag-js/react'
import type { JSX } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import type { CollectionItem } from '../collection'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence'
import type { UseComboboxReturn } from './use-combobox'
import { ComboboxProvider } from './use-combobox-context'

interface RootProviderProps<T extends CollectionItem> {
  value: UseComboboxReturn<T>
}

export interface ComboboxRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>, UsePresenceProps, PolymorphicProps {}

export interface ComboboxRootProviderProps<T extends CollectionItem>
  extends HTMLProps<'div'>, ComboboxRootProviderBaseProps<T> {}

export const ComboboxRootProvider = <T extends CollectionItem>({
  ref,
  ...props
}: ComboboxRootProviderProps<T>): JSX.Element => {
  const [presenceProps, comboboxProps] = splitPresenceProps(props)
  const [{ value: combobox }, localProps] = createSplitProps<RootProviderProps<T>>()(comboboxProps, ['value'])
  const presence = usePresence(mergeProps({ present: combobox.open }, presenceProps))
  const mergedProps = mergeProps(combobox.getRootProps(), localProps)

  return (
    <ComboboxProvider value={combobox}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </ComboboxProvider>
  )
}
