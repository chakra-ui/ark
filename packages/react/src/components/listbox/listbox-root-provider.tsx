'use client'

import { mergeProps } from '@zag-js/react'
import type { JSX } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import type { CollectionItem } from '../collection'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseListboxReturn } from './use-listbox'
import { ListboxProvider } from './use-listbox-context'

interface RootProviderProps<T extends CollectionItem> {
  value: UseListboxReturn<T>
}

export interface ListboxRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>, PolymorphicProps {}

export interface ListboxRootProviderProps<T extends CollectionItem>
  extends HTMLProps<'div'>, ListboxRootProviderBaseProps<T> {}

export const ListboxRootProvider = <T extends CollectionItem>({
  ref,
  ...props
}: ListboxRootProviderProps<T>): JSX.Element => {
  const [{ value: listbox }, localProps] = createSplitProps<RootProviderProps<T>>()(props, ['value'])
  const mergedProps = mergeProps(listbox.getRootProps(), localProps)

  return (
    <ListboxProvider value={listbox}>
      <ark.div {...mergedProps} ref={ref} />
    </ListboxProvider>
  )
}
