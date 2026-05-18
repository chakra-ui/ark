'use client'

import { mergeProps } from '@zag-js/react'
import { type JSX, type Ref, type RefAttributes, forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import type { CollectionItem } from '../collection/index.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence/index.ts'
import type { UseComboboxReturn } from './use-combobox.ts'
import { ComboboxProvider } from './use-combobox-context.ts'

interface RootProviderProps<T extends CollectionItem> {
  value: UseComboboxReturn<T>
}
export interface ComboboxRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>, UsePresenceProps, PolymorphicProps {}
export interface ComboboxRootProviderProps<T extends CollectionItem>
  extends HTMLProps<'div'>, ComboboxRootProviderBaseProps<T> {}

const ComboboxImpl = <T extends CollectionItem>(props: ComboboxRootProviderProps<T>, ref: Ref<HTMLDivElement>) => {
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

export type ComboboxRootProviderComponent<P = {}> = <T extends CollectionItem>(
  props: Assign<ComboboxRootProviderProps<T>, P> & RefAttributes<HTMLDivElement>,
) => JSX.Element

export const ComboboxRootProvider = forwardRef(ComboboxImpl) as ComboboxRootProviderComponent
