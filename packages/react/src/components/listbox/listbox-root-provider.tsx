'use client'

import { mergeProps } from '@zag-js/react'
import { type JSX, forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import type { CollectionItem } from '../collection/index.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseListboxReturn } from './use-listbox.ts'
import { ListboxProvider } from './use-listbox-context.ts'

interface RootProviderProps<T extends CollectionItem> {
  value: UseListboxReturn<T>
}
export interface ListboxRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>, PolymorphicProps {}
export interface ListboxRootProviderProps<T extends CollectionItem>
  extends HTMLProps<'div'>, ListboxRootProviderBaseProps<T> {}

const ListboxImpl = <T extends CollectionItem>(props: ListboxRootProviderProps<T>, ref: React.Ref<HTMLDivElement>) => {
  const [{ value: listbox }, localProps] = createSplitProps<RootProviderProps<T>>()(props, ['value'])
  const mergedProps = mergeProps(listbox.getRootProps(), localProps)

  return (
    <ListboxProvider value={listbox}>
      <ark.div {...mergedProps} ref={ref} />
    </ListboxProvider>
  )
}

export type ListboxRootProviderComponent<P = {}> = <T extends CollectionItem>(
  props: Assign<ListboxRootProviderProps<T>, P> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element

export const ListboxRootProvider = forwardRef(ListboxImpl) as ListboxRootProviderComponent
